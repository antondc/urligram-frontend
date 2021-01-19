import { LanguagesApiResponse } from './languages.types';

export const languagesData: LanguagesApiResponse = {
  links: {
    self: 'https://0.0.0.0:3000/api/v1/languages',
  },
  data: [
    {
      type: 'languages',
      attributes: {
        id: 1,
        order: null,
        name: 'English',
        isDefault: true,
        slug: 'en',
        glossary: {
          home: 'Home',
          tags: 'Tags',
          links: 'Links',
          lists: 'Lists',
          login: 'Login',
          users: 'Users',
          logout: 'Log out',
          control: 'Control',
          notFound: 'Not found',
          trending: 'Trending',
          bookmarks: 'Bookmarks',
          followers: 'Followers',
          following: 'Following',
          since: 'Following',
        },
      },
    },
    {
      type: 'languages',
      attributes: {
        id: 2,
        order: null,
        name: 'Español',
        isDefault: false,
        slug: 'es',
        glossary: {
          home: 'Casa',
          tags: 'Tags',
          links: 'Links',
          lists: 'Listas',
          login: 'Log in',
          users: 'Usuarios',
          logout: 'Log out',
          control: 'Control',
          notFound: 'Not found',
          trending: 'Trending',
          bookmarks: 'Bookmarks',
          followers: 'Seguidores',
          following: 'Siguiendo',
          since: 'Desde',
        },
      },
    },
  ],
};
