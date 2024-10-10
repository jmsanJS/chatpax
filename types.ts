import { Router } from "expo-router";

export interface UsersProps {
  users: UserData[];
  router?: Router;
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