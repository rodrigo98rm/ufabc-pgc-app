type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  NewNote: Note | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type Note = {
  id: number;
  title: string;
  description: string;
  pinned: boolean;
  createdAt: string;
};

type Section = {
  title: string;
  data: Note[];
};
