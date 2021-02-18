import React, { Fragment } from 'react';

import { A, Border } from '@antoniodcorrea/components';
import { calculatePages } from './calculatePages';

import './Pagination.less';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  offset?: number;
  path: string;
  pageNeighbours?: number;
  grow?: boolean;
}

const Pagination: React.FC<Props> = ({
  totalItems = 0,
  itemsPerPage = 10,
  offset = 0,
  path,
  pageNeighbours = 1,
  grow,
}) => {
  const pages = calculatePages({ totalItems, itemsPerPage, path, offset, pageNeighbours });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={'Pagination ' + (grow ? 'Pagination-grow' : '')}>
      <Border className="Pagination-border" padding="small" grow={grow}>
        {pages.map((item, index) =>
          !!item ? (
            <A
              className="Pagination-item"
              href={item.path}
              key={index}
              styled
              disabled={item.current}
              frontend
              onClick={scrollToTop}
            >
              {item.page}
            </A>
          ) : (
            <Fragment key={index}>
              <span className="Pagination-dots Pagination-item">...</span>
            </Fragment>
          )
        )}
      </Border>
    </div>
  );
};

export default Pagination;
