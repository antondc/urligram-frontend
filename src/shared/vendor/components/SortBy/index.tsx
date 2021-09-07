import React from 'react';

import Sort from 'Assets/svg/sort.svg';
import { URLWrapper } from 'Services/URLWrapper';
import { A } from '../A';

import './SortBy.less';

export type SortByOption = {
  label: string;
  field: string;
  icon?: React.ElementType;
};

interface Props {
  className?: string;
  href: string;
  options: SortByOption[];
  currentSort: string;
  loading?: boolean;
}

export const SortBy: React.FC<Props> = ({ className, href, options, currentSort, loading }) => {
  const url = new URLWrapper(href);
  url.deleteSearchParam('page[offset]'); // Reset offset on click
  const currentSortIsAsc = !currentSort?.startsWith('-');
  const currentSortIsDesc = currentSort?.startsWith('-');

  const scrollToTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
    });
  };

  return (
    <ul className={'SortBy' + (className ? ' ' + className : '') + (loading ? ' SortBy--loading' : '')}>
      {options.map((item, index) => {
        const isActiveItem = item.field === currentSort || `-${item.field}` === currentSort;
        url.upsertSearchParams({ sort: item.field });
        const redirectUrlAsc = url.getPathAndSearch();
        url.upsertSearchParams({ sort: `-${item.field}` });
        const redirectUrlDesc = url.getPathAndSearch();
        const displayedUrl = currentSortIsDesc && isActiveItem ? redirectUrlAsc : redirectUrlDesc;
        const Icon = item?.icon;

        return (
          <li
            className={'SortBy-listItem' + (isActiveItem ? ' SortBy-listItem--active' : '')}
            key={index}
            onClick={scrollToTop}
          >
            <A href={displayedUrl} styled={false} frontend className="SortBy-listItemLink">
              <span className="SortBy-label">{item.label}</span>
              {item?.icon && <Icon className="SortBy-icon" />}
              <Sort className={'SortBy-sortIcon' + (currentSortIsAsc && isActiveItem ? ' SortBy-sortIcon--asc' : '')} />
            </A>
          </li>
        );
      })}
    </ul>
  );
};
