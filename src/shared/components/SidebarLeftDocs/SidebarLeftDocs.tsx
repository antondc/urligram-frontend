import React from 'react';

import List from 'Assets/svg/list.svg';
import Circle from 'Assets/svg/logoCircleEmpty.svg';
import Tag from 'Assets/svg/tag.svg';
import UserFill from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './SidebarLeftDocs.less';

interface Props {
  routeName: string;
  glossary: GlossaryState;
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => void;
  sidebarLeftClosed: boolean;
}

export const SidebarLeftDocs: React.FC<Props> = ({ routeName, glossary, sidebarLeftClosed, onAnchorClick }) => (
  <div
    className={'SidebarLeftDocs' + (sidebarLeftClosed ? ' SidebarLeftDocs--closed' : '')}
    data-test-id="SidebarLeftDocs"
  >
    <div className="SidebarLeftDocs-items">
      <A
        className={'SidebarLeftDocs-item' + (routeName === 'Home' ? ' SidebarLeftDocs-item--active' : '')}
        href="/docs#help"
        onClick={(e) => onAnchorClick(e, 'help')}
        styled={false}
        frontend
      >
        <Circle className="SidebarLeftDocs-itemIcon" />
        <span className="SidebarLeftDocs-itemDescription">Help</span>
      </A>
      <A
        className={'SidebarLeftDocs-item' + (routeName === 'Lists' ? ' SidebarLeftDocs-item--active' : '')}
        href="/docs#about"
        onClick={(e) => onAnchorClick(e, 'about')}
        styled={false}
        frontend
      >
        <List className="SidebarLeftDocs-itemIcon SidebarLeftDocs-itemIconList" />
        <span className="SidebarLeftDocs-itemDescription">About</span>
      </A>
      <A
        className={'SidebarLeftDocs-item' + (routeName === 'Users' ? ' SidebarLeftDocs-item--active' : '')}
        href="/docs#privacy"
        onClick={(e) => onAnchorClick(e, 'privacy')}
        styled={false}
        frontend
      >
        <UserFill className="SidebarLeftDocs-itemIcon" />
        <span className="SidebarLeftDocs-itemDescription">Privacy</span>
      </A>
    </div>
  </div>
);
