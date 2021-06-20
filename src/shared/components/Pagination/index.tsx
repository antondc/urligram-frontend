import React, { Fragment, useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { A, Fade, Flex, Frame, Span } from 'Vendor/components';
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

  const scrollToTop = (e) => {
    e.preventDefault();
    const { href } = e.target;
    const url = new URLWrapper(href);
    const pathAndSearch = url.getPathAndSearch();

    setTimeout(() => history.push(pathAndSearch), 120);

    scroll.scrollToTop({
      duration: 120,
      smooth: 'easeOutQuart',
    });
  };

  useEffect(() => {
    const pages = calculatePages({ totalItems, itemsPerPage, path, offset, pageNeighbours });
    const mounted = !!totalItems && pages?.length > 1;

    setPages(pages);
    setMounted(mounted);
  }, [totalItems, itemsPerPage, offset, pageNeighbours, path]);

  return (
    <div className="Pagination">
      <Fade mounted={mounted}>
        {pages.map((item, index) =>
          !!item ? (
            <A
              className="Pagination-item"
              key={index}
              href={item.path}
              underlined
              active={item?.current}
              frontend
              onClick={scrollToTop}
            >
              {item.page}
            </A>
          ) : (
            <span className="Pagination-dots Pagination-item" key={index}>
              ...
            </span>
          )
        )}
      </Fade>
    </div>
  );
};

export default Pagination;
