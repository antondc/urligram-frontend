import React, { useEffect } from 'react';

import { URLWrapper } from 'Services/URLWrapper';
import { A, ArrowUp, Border } from '@antoniodcorrea/components';

import './SortBy.less';

interface Props {
  className?: string;
  href: string;
  options: {
    label: string;
    field: string;
  }[];
  activeSort: string;
}

export const SortBy: React.FC<Props> = ({ className, href, options, activeSort = 'id' }) => {
  const url = new URLWrapper(href);
  const activeSortIsDesc = activeSort?.startsWith('-');

  return (
    <Border className={'SortBy' + (className ? ' ' + className : '')} padding="small">
      <ul className={'SortBy-list'}>
        {options.map((item, index) => {
          const isActiveItem = item.field === activeSort || `-${item.field}` === activeSort;
          const isActiveItemAndActiveSortIsAsc = !activeSortIsDesc && isActiveItem;
          const iconDesc = activeSortIsDesc && isActiveItem;
          url.upsertSearchParam('sort', item.field);
          const optionUrlAsc = url.getPathAndSearch();
          url.upsertSearchParam('sort', `-${item.field}`);
          const optionUrlDesc = url.getPathAndSearch();
          const displayedUrl = isActiveItemAndActiveSortIsAsc ? optionUrlDesc : optionUrlAsc;

          return (
            <li
              className={'SortBy-listItem' + (isActiveItem ? ' SortBy-listItem--active' : '')}
              key={index}
              id={isActiveItem && ' SortBy-listItem--active'}
            >
              <A href={displayedUrl} key={index} styled={false} frontend className={'SortBy-listItemLink'}>
                {item.label}{' '}
                {/* <ArrowUp
                  size="small"
                  className={'SortBy-listItemIcon' + (iconDesc ? ' SortBy-listItemIcon--desc' : '')}
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28.3 28.3"
                  className={'SortBy-listItemIcon' + (iconDesc ? ' SortBy-listItemIcon--desc' : '')}
                >
                  <path d="M14.2 12.4L3.5 23 0 19.4 10.6 8.8l3.5-3.5 14.2 14.1-3.5 3.5-10.6-10.5z"></path>
                </svg>
              </A>
            </li>
          );
        })}
      </ul>
    </Border>
  );
};
