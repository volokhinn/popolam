export interface RootState {
    friends: FriendsState;
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
