import React, { useState } from 'react';

import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { A, ArrowUp, Border } from '@antoniodcorrea/components';

import './SortBy.less';

const DEFAULT_ACTIVE_SORT = 'id';

interface Props {
  className?: string;
  href: string;
  options: {
    label: string;
    field: string;
  }[];
}

export const SortBy: React.FC<Props> = ({ className, href, options }) => {
  const url = new URLWrapper(href);
  const activeSort = url.getSearchParam('sort') || DEFAULT_ACTIVE_SORT;
  const activeSortIsDesc = activeSort?.startsWith('-');
  const [activeOption, setActiveOption] = useState<string>(activeSort);

  const setActiveSortAndNavigate = (e: React.MouseEvent<HTMLAnchorElement>, displayedUrl: string) => {
    e.preventDefault();

    const url = new URLWrapper(displayedUrl);
    const sort = url.getSearchParam('sort');

    setActiveOption(sort);

    history.push(displayedUrl);
  };

  return (
    <Border className={'SortBy' + (className ? ' ' + className : '')} padding="small">
      <ul className={'SortBy-list'}>
        {options.map((item, index) => {
          const isActiveItem = item.field === activeOption || `-${item.field}` === activeOption;
          const isActiveItemAndActiveSortIsAsc = !activeSortIsDesc && isActiveItem;
          const iconDesc = activeSortIsDesc && isActiveItem;
          url.upsertSearchParam('sort', item.field);
          const redirectUrlAsc = url.getPathAndSearch();
          url.upsertSearchParam('sort', `-${item.field}`);
          const redirectUrlDesc = url.getPathAndSearch();
          const displayedUrl = isActiveItemAndActiveSortIsAsc ? redirectUrlDesc : redirectUrlAsc;

          return (
            <li className={'SortBy-listItem' + (isActiveItem ? ' SortBy-listItem--active' : '')} key={index}>
              <A
                href={displayedUrl}
                onClick={(e) => setActiveSortAndNavigate(e, displayedUrl)}
                styled={false}
                frontend
                disabled
                className="SortBy-listItemLink"
              >
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
