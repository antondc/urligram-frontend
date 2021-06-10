import React from 'react';

import { URLWrapper } from '../../../services/URLWrapper';
import { A } from '../A';
import { Span } from '../Span';
import { Sort } from '../Svg';

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
  const currentSortIsAsc = !currentSort?.startsWith('-');
  const currentSortIsDesc = currentSort?.startsWith('-');

  return (
    <ul className={'SortBy' + (className ? ' ' + className : '')}>
      {options.map((item, index) => {
        const isActiveItem = item.field === currentSort || `-${item.field}` === currentSort;
        url.upsertSearchParams({ sort: item.field });
        const redirectUrlAsc = url.getPathAndSearch();
        url.upsertSearchParams({ sort: `-${item.field}` });
        const redirectUrlDesc = url.getPathAndSearch();
        const displayedUrl = currentSortIsDesc && isActiveItem ? redirectUrlAsc : redirectUrlDesc;

        return (
          <li className={'SortBy-listItem' + (isActiveItem ? ' SortBy-listItem--active' : '')} key={index}>
            <A href={displayedUrl} styled={false} frontend className="SortBy-listItemLink">
              <Span size="small" weight="extraBold">
                {item.label}{' '}
              </Span>
              <Sort
                size="micro"
                className={
                  'SortBy-listItemIcon' + (currentSortIsAsc && isActiveItem ? ' SortBy-listItemIcon--asc' : '')
                }
              />
            </A>
          </li>
        );
      })}
    </ul>
  );
};
