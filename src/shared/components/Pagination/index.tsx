import React, { Fragment } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { A, Fade, Frame, Span } from 'Vendor/components';
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
  const mounted = !!totalItems && pages?.length > 1;

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

  return (
    <Fade mounted={mounted} speed="slow">
      <div className={'Pagination ' + (grow ? 'Pagination-grow' : '')}>
        <Frame className="Pagination-border" padding="small" grow={grow} weight="none">
          {pages.map((item, index) =>
            !!item ? (
              <Span bold>
                <A
                  className="Pagination-item"
                  href={item.path}
                  key={index}
                  underlined
                  disabled={item?.current}
                  frontend
                  onClick={scrollToTop}
                >
                  {item.page}
                </A>
              </Span>
            ) : (
              <Fragment key={index}>
                <Span bold className="Pagination-dots Pagination-item">
                  ...
                </Span>
              </Fragment>
            )
          )}
        </Frame>
      </div>
    </Fade>
  );
};

export default Pagination;
