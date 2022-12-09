import React from 'react';

import A from 'Components/A';
import { Routes } from 'Router/routes';
import { ListItem } from './listItems';

import './SidebarLeftDocs.less';

interface Props {
  hash: string;
  onAnchorClick: (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => void;
  sidebarLeftClosed: boolean;
  listItems: ListItem[];
}

export const SidebarLeftDocs: React.FC<Props> = ({ hash, sidebarLeftClosed, onAnchorClick, listItems }) => (
  <div
    className={'SidebarLeftDocs' + (sidebarLeftClosed ? ' SidebarLeftDocs--closed' : '')}
    data-test-id="SidebarLeftDocs"
  >
    <div className="SidebarLeftDocs-items">
      {listItems.map((item) => {
        const isActive = item.hashActive.includes(hash);
        const subItemsOpened = isActive || item?.subItems.some((item) => item.hashActive === hash);
        const Icon = item?.icon;

        return (
          <React.Fragment key={item.hash}>
            <A
              href={`${Routes.Docs.route}#${item.hash}`}
              className={'SidebarLeftDocs-item' + (isActive ? ' SidebarLeftDocs-item--active' : '')}
              key={item.hash}
              onClick={(e) => onAnchorClick(e, item.hash)}
              frontend
            >
              {item?.icon && <Icon className="SidebarLeftDocs-itemIcon" />}
              <span className="SidebarLeftDocs-itemDescription">{item.text}</span>
            </A>
            {item?.subItems && (
              <div className={'SidebarLeftDocs-subItems' + (subItemsOpened ? ' SidebarLeftDocs-subItems--opened' : '')}>
                {item?.subItems?.map((subItem) => {
                  const subItemIsActive = subItem.hashActive.includes(hash);

                  return (
                    <A
                      className={
                        'SidebarLeftDocs-item SidebarLeftDocs-subItem' +
                        (subItemIsActive ? ' SidebarLeftDocs-item--active' : '')
                      }
                      href={`${Routes.Docs.route}#${subItem.hash}`}
                      key={subItem.hash}
                      onClick={(e) => onAnchorClick(e, subItem.hash)}
                      frontend
                    >
                      <span className="SidebarLeftDocs-itemDescription">{subItem.text}</span>
                    </A>
                  );
                })}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);
