export interface RootState {
  friends: {
    friends: Friend[];
  };
  bill: {
    selectedFriends: Friend[];
  };
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
