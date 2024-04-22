import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
import { Friend, Transaction } from './store/types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || '';
const BUCKET_URL="https://nigothnmpjcxraitwgte.supabase.co/storage/v1/object/public"

type AppContextType = {
  friends: Friend[];
  transactions: Transaction[];
  setFriends: (friends: Friend[]) => void;
  fetchFriendsFromSupabase: () => Promise<void>;
  clearFriends: () => Promise<void>;
  fetchTransactions: () => Promise<void>;
  clearHistory: () => Promise<void>;
  handleRemoveFriend: (id: number) => Promise<void>;
  handleAddFriend: (name: string, file: File | null)  => void;
  supabase: ReturnType<typeof createClient>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const FriendsContext = createContext<AppContextType | undefined>(undefined);

export const TransactionsContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const user = useUser();
  const { getToken } = useAuth();
  const userId = user.user ? user.user.id : '';

  const [friends, setFriends] = useState<Friend[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    const initializeSupabase = async () => {
      const supabaseAccessToken = await getToken({ template: 'supabase' });
      const client = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } }
      });
      setSupabase(client);
    };

    initializeSupabase();
  }, [getToken]);

  const fetchFriendsFromSupabase = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('friends').select('*').eq('user_id', userId);
      if (error) {
        throw error;
      }
      setFriends(data || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }, [supabase, userId]);

  const clearFriends = async () => {
    try {
      const { error } = await supabase.from('friends').delete().eq('user_id', userId);
      if (error) {
        throw error;
      }
      await fetchFriendsFromSupabase();
    } catch (error) {
      console.error('Error clearing friends:', error);
    }
  };
  

  const clearHistory = async () => {
    try {
      const { error } = await supabase.from('transactions').delete().eq('user_id', userId);
      if (error) {
        throw error;
      }
      await fetchTransactions();
    } catch (error) {
      console.error('Error clearing transactions:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId);
      if (error) {
        throw error;
      }
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleRemoveFriend = async (id: number) => {
    try {

      const friend = friends.find(friend => friend.id === id);
      const avatarPath = friend?.img;
  
      const { error: removeFriendError } = await supabase.from('friends').delete().eq('id', id);
      if (removeFriendError) {
        throw removeFriendError;
      }
  
      if (avatarPath) {
        const filename = avatarPath.split('/').pop();
        const { error: removeAvatarError } = await supabase.storage.from('avatars').remove([`avatars/${filename}`]);
        if (removeAvatarError) {
          throw removeAvatarError;
        }
      }
  
      setFriends(prevFriends => prevFriends.filter(friend => friend.id !== id));
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };  

  const handleAddFriend = async (name: string, file: File | null) => {
    if (name.length < 2 || name.length > 10) {
      return;
    }
  
    try {
      if (file) {
        const filename = `${Date.now()}_${file.name}`
      const { data } = await supabase.storage.from('avatars').upload(`/avatars/${filename}`, file, {
        upsert: true,
        contentType: 'image/*'
      });
      

      const filepath = data?.path;

      const { error } = await supabase.from('friends').insert([
        { name: name[0].toUpperCase() + name.slice(1), img: `${BUCKET_URL}/avatars/${filepath}`, money: 0 }
      ]);
  
      if (error) {
        throw error;
      }

      } else {
        const { error } = await supabase.from('friends').insert([
          { name: name[0].toUpperCase() + name.slice(1), img: '', money: 0 }
        ]);

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  useEffect(() => {
    if (supabase) {
      fetchFriendsFromSupabase();
      fetchTransactions();
    }
  }, [supabase, userId]);

  useEffect(() => {
    if (supabase) {
      fetchFriendsFromSupabase();
    }
  }, [fetchFriendsFromSupabase, supabase]);

  const appContextValue: AppContextType = {
    friends,
    transactions,
    setFriends,
    fetchFriendsFromSupabase,
    clearFriends,
    clearHistory,
    fetchTransactions,
    handleRemoveFriend,
    handleAddFriend,
    supabase,
  };

  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
};