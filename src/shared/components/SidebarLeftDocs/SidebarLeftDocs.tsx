import React from 'react';

import FAQ from 'Assets/svg/faq.svg';
import Glossary from 'Assets/svg/glossary.svg';
import Info from 'Assets/svg/info.svg';
import Legal from 'Assets/svg/legal.svg';
import A from 'Components/A';

import './SidebarLeftDocs.less';

interface Props {
  hash: string;
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => void;
  sidebarLeftClosed: boolean;
}

export const SidebarLeftDocs: React.FC<Props> = ({ hash, sidebarLeftClosed, onAnchorClick }) => (
  <div
    className={'SidebarLeftDocs' + (sidebarLeftClosed ? ' SidebarLeftDocs--closed' : '')}
    data-test-id="SidebarLeftDocs"
  >
    <div className="SidebarLeftDocs-items">
      <A
        className={'SidebarLeftDocs-item' + (hash === 'faq' ? ' SidebarLeftDocs-item--active' : '')}
        href="/docs#faq"
        onClick={(e) => onAnchorClick(e, 'faq')}
        styled={false}
        frontend
      >
        <FAQ className="SidebarLeftDocs-itemIcon" />
        <span className="SidebarLeftDocs-itemDescription">F. A. Q.</span>
      </A>
      <A
        className={'SidebarLeftDocs-item' + (hash === 'legal' ? ' SidebarLeftDocs-item--active' : '')}
        href="/docs#legal"
        onClick={(e) => onAnchorClick(e, 'legal')}
        styled={false}
        frontend
      >
        <Legal className="SidebarLeftDocs-itemIcon" />
        <span className="SidebarLeftDocs-itemDescription">Legal</span>
      </A>
      <div
        className={
          'SidebarLeftDocs-subItems' +
          (hash === 'legal' || hash === 'disclaimer' || hash === 'privacy-policy'
            ? ' SidebarLeftDocs-subItems--opened'
            : '')
        }
      >
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' +
            (hash === 'disclaimer' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#disclaimer"
          onClick={(e) => onAnchorClick(e, 'disclaimer')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Disclaimer</span>
        </A>
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' +
            (hash === 'privacy-policy' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#privacy-policy"
          onClick={(e) => onAnchorClick(e, 'privacy-policy')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Privacy policy</span>
        </A>
      </div>
      <A
        className={'SidebarLeftDocs-item' + (hash === 'glossary' ? ' SidebarLeftDocs-item--active' : '')}
        href="/docs#glossary"
        onClick={(e) => onAnchorClick(e, 'glossary')}
        styled={false}
        frontend
      >
        <Glossary className="SidebarLeftDocs-itemIcon" />
        <span className="SidebarLeftDocs-itemDescription">Glossary</span>
      </A>
      <div
        className={
          'SidebarLeftDocs-subItems' +
          (hash === 'glossary' ||
          hash === 'visitor' ||
          hash === 'user' ||
          hash === 'link' ||
          hash === 'bookmark' ||
          hash === 'tag' ||
          hash === 'list' ||
          hash === 'follower' ||
          hash === 'extension'
            ? ' SidebarLeftDocs-subItems--opened'
            : '')
        }
      >
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' + (hash === 'visitor' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#visitor"
          onClick={(e) => onAnchorClick(e, 'visitor')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Visitor</span>
        </A>
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' + (hash === 'user' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#user"
          onClick={(e) => onAnchorClick(e, 'user')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">User</span>
        </A>
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' + (hash === 'link' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#link"
          onClick={(e) => onAnchorClick(e, 'link')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Link</span>
        </A>
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' +
            (hash === 'bookmark' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#bookmark"
          onClick={(e) => onAnchorClick(e, 'bookmark')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Bookmark</span>
        </A>
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' + (hash === 'tag' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#tag"
          onClick={(e) => onAnchorClick(e, 'tag')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Tag</span>
        </A>
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' + (hash === 'list' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#list"
          onClick={(e) => onAnchorClick(e, 'list')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">List</span>
        </A>
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' +
            (hash === 'follower' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#follower"
          onClick={(e) => onAnchorClick(e, 'follower')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Follower</span>
        </A>
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' +
            (hash === 'extension' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#extension"
          onClick={(e) => onAnchorClick(e, 'extension')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Extension</span>
        </A>
      </div>
      <A
        className={'SidebarLeftDocs-item' + (hash === 'about' ? ' SidebarLeftDocs-item--active' : '')}
        href="/docs#about"
        onClick={(e) => onAnchorClick(e, 'about')}
        styled={false}
        frontend
      >
        <Info className="SidebarLeftDocs-itemIcon" />
        <span className="SidebarLeftDocs-itemDescription">About</span>
      </A>
      <div
        className={
          'SidebarLeftDocs-subItems' +
          (hash === 'contact' || hash === 'about' ? ' SidebarLeftDocs-subItems--opened' : '')
        }
      >
        <A
          className={
            'SidebarLeftDocs-item SidebarLeftDocs-subItem' + (hash === 'contact' ? ' SidebarLeftDocs-item--active' : '')
          }
          href="/docs#contact"
          onClick={(e) => onAnchorClick(e, 'contact')}
          styled={false}
          frontend
        >
          <span className="SidebarLeftDocs-itemDescription">Contact</span>
        </A>
      </div>
    </div>
  </div>
);
