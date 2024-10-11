import { Router } from "expo-router";
import { Timestamp } from "firebase/firestore";

export interface UsersProps {
  users: UserData[];
  router?: Router;
  currentUser: UserData;
};

export interface UserProps {
  user: UserData;
  router: Router;
}

export interface UserData {
  profileUrl: string;
  userId: string;
  username: string;
};

export interface ItemProps {
  item: UserData;
  index: number;
  router: Router;
  currentUser: UserData;
};

export interface Children {
  children: React.ReactNode;
  inChat: boolean | undefined;
}

export interface MenuItemsProps {
  text: string;
  action: (value: string) => void;
  value: any;
  icon: React.ReactNode;
}

export interface MessageProps {
  userId: string;
  text: string;
  profileUrl: string;
  senderName: string;
  createdAt: Timestamp;
}

export interface MessageItemProps {
  message: MessageProps;
  currentUser: UserData;
}