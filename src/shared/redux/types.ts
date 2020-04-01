interface Route {
  url: string;
  pageType: string;
  pageTitle: string;
}

interface Language {
  id: number;
  order: number;
  name: string;
  isDefault: boolean;
  word1: string;
  word2: string;
  word3: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  order: number;
  name: string;
  email: string;
  active: boolean;
  level: string;
  logged: boolean;
  token?: string;
}

interface State {
  navigation: {
    history: Route[];
    currentPath: Route;
  };
  user: User;
  language: {
    Current: Language;
    Languages: {
      [key: string]: Language;
    };
  };
}
