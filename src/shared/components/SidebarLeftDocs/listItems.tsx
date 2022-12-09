import React from 'react';

import Browser from 'Assets/svg/browser.svg';
import FAQ from 'Assets/svg/faq.svg';
import Glossary from 'Assets/svg/glossary.svg';
import Info from 'Assets/svg/info.svg';
import Legal from 'Assets/svg/legal.svg';

type ListSubItem = {
  text: string;
  hash: string;
  hashActive: string;
};

export type ListItem = {
  text: string;
  hash: string;
  hashActive: string[];
  icon: (props) => React.ReactElement;
  hashOpened: string[];
  subItems: ListSubItem[];
};

export const listItems: ListItem[] = [
  {
    text: 'F. A. Q.',
    hash: 'faq',
    hashActive: ['faq'],
    hashOpened: [],
    icon: (props): React.ReactElement => <FAQ {...props} />,
    subItems: [],
  },
  {
    text: 'Extension',
    hash: 'extension',
    hashActive: ['extension'],
    hashOpened: [],
    icon: (props): React.ReactElement => <Browser {...props} />,
    subItems: [],
  },
  {
    text: 'Legal',
    hash: 'legal',
    hashActive: ['legal'],
    icon: (props): React.ReactElement => <Legal {...props} />,
    hashOpened: ['legal', 'disclaimer', 'privacy-policy'],
    subItems: [
      {
        text: 'Disclaimer',
        hash: 'disclaimer',
        hashActive: 'disclaimer',
      },
      {
        text: 'Privacy policy',
        hash: 'privacy-policy',
        hashActive: 'privacy-policy',
      },
    ],
  },
  {
    text: 'Glossary',
    hash: 'glossary',
    hashActive: ['glossary'],
    icon: (props): React.ReactElement => <Glossary {...props} />,
    hashOpened: ['glossary', 'visitor', 'user', 'link', 'bookmark', 'tag', 'list', 'follower', 'extension'],
    subItems: [
      {
        text: 'Visitor',
        hash: 'visitor',
        hashActive: 'visitor',
      },
      {
        text: 'User',
        hash: 'user',
        hashActive: 'user',
      },
      {
        text: 'Link',
        hash: 'link',
        hashActive: 'link',
      },
      {
        text: 'Bookmark',
        hash: 'bookmark',
        hashActive: 'bookmark',
      },
      {
        text: 'Tag',
        hash: 'tag',
        hashActive: 'tag',
      },
      {
        text: 'List',
        hash: 'list',
        hashActive: 'list',
      },
      {
        text: 'Follower',
        hash: 'follower',
        hashActive: 'follower',
      },
    ],
  },
  {
    text: 'About',
    hash: 'about',
    hashActive: ['about'],
    icon: (props): React.ReactElement => <Info {...props} />,
    hashOpened: ['about', 'contact'],
    subItems: [
      {
        text: 'Contact',
        hash: 'contact',
        hashActive: 'contact',
      },
    ],
  },
];
