export interface RootState {
  friends: {
    friends: Friend[];
  };
  bill: {
    selectedFriends: Friend[];
    transactions: Transaction[];
  };
}

export interface TransactionDetails {
  friendName: string;
  friendImg?: string;
  amount: number;
}

export interface Transaction {
  date: Date;
  totalAmount: number;
  friendNames: string[];
  details: {
    friendName: string;
    friendImg?: string;
    amount: number;
  }[];
  myAmount: string;
  paidBy: string | null;
  id: number;
}

export interface FriendsState {
    friends: Friend[];
}

export interface Friend {
    id: number,
    name: string;
    img?: string;
    money: number;
}
