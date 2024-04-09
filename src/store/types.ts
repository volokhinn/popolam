export interface RootState {
  friends: {
    friends: Friend[];
  };
  bill: {
    selectedFriends: Friend[];
    transactions: Transaction[];
  };
}

export interface Transaction {
  date: string;
  totalAmount: number;
  friendNames: string[];
  details: {
    friendName: string;
    amount: number;
  }[];
  myAmount: string;
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
