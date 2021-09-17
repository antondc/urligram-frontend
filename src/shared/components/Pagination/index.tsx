import React, { useEffect, useState } from 'react';

import A from 'Components/A';
import { Fade } from '@antoniodcorrea/components';
import { calculatePages } from './calculatePages';

import './Pagination.less';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  offset?: number;
  path: string;
  pageNeighbours?: number;
}

const Pagination: React.FC<Props> = ({ totalItems = 0, itemsPerPage = 10, offset = 0, path, pageNeighbours = 1 }) => {
  const [pages, setPages] = useState<Array<any>>([]);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const pages = calculatePages({ totalItems, itemsPerPage, path, offset, pageNeighbours });
    const mounted = !!totalItems && pages?.length > 1;

    setPages(pages);
    setMounted(mounted);
  }, [totalItems, itemsPerPage, offset, pageNeighbours, path]);

  return (
    <div className="Pagination">
      <Fade mounted={mounted}>
        <div className="Pagination-wrapper">
          {pages.map((item, index) =>
            !!item ? (
              <A className="Pagination-item" key={index} href={item.path} underlined active={item?.current} frontend>
                {item.page}
              </A>
            ) : (
              <span className="Pagination-dots Pagination-item" key={index}>
                ...
              </span>
            )
          )}
        </div>
      </Fade>
    </div>
  );
};

export default Pagination;
