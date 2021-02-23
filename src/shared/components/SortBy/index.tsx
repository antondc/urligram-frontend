import React from 'react';

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
  currentSort: string;
}

export const SortBy: React.FC<Props> = ({ className, href, options, currentSort }) => {
  const url = new URLWrapper(href);
  url.deleteSearchParam('page[offset]'); // Reset offset on click
  const currentSortIsDesc = currentSort?.startsWith('-');

  return (
    <Border className={'SortBy' + (className ? ' ' + className : '')} padding="small">
      <ul className={'SortBy-list'}>
        {options.map((item, index) => {
          const isActiveItem = item.field === currentSort || `-${item.field}` === currentSort;
          const isActiveItemAndActiveSortIsAsc = !currentSortIsDesc && isActiveItem;
          const iconDesc = currentSortIsDesc && isActiveItem;
          url.upsertSearchParam('sort', item.field);
          const redirectUrlAsc = url.getPathAndSearch();
          url.upsertSearchParam('sort', `-${item.field}`);
          const redirectUrlDesc = url.getPathAndSearch();
          const displayedUrl = isActiveItemAndActiveSortIsAsc ? redirectUrlDesc : redirectUrlAsc;

          return (
            <li className={'SortBy-listItem' + (isActiveItem ? ' SortBy-listItem--active' : '')} key={index}>
              <A href={displayedUrl} styled={false} frontend className="SortBy-listItemLink">
                {item.label}{' '}
                <ArrowUp
                  size="small"
                  className={'SortBy-listItemIcon' + (iconDesc ? ' SortBy-listItemIcon--desc' : '')}
                />
              </A>
            </li>
          );
        })}
      </ul>
    </Border>
  );
};
