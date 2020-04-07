export interface Route {
  url: string;
  pageType: string;
  pageTitle: string;
}

export interface Language {
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

export interface User {
  id: string;
  order: number;
  name: string;
  email: string;
  active: boolean;
  level: string;
  logged: boolean;
  token?: string;
  iat: number;
}

export interface State {
  navigation: {
    history: Route[];
    currentPath: Route;
    previousPath: Route;
  };
  User: User;
  Languages: {
    Current: Language;
    Languages: {
      [key: string]: Language;
    };
  };
}
