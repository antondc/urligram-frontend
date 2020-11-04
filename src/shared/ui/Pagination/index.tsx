import React, { Component, Fragment } from 'react';

import Border from 'Ui/Border';
import { A } from '@antoniodcorrea/components';

import './Pagination.less';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  page: number;
  path: string;
  pageNeighbours: number;
  grow?: boolean;
}

export class Pagination extends Component<Props> {
  tempPreviousPage = 0;

  static defaultProps = {
    pageNeighbours: 1,
  };

  createPages = (from: number, to: number, totalPages: number): number[] => {
    let i: number = from;
    const range: number[] = [];

    while (i <= to) {
      range.push(i);
      i += 1;
    }
    if (range[0] !== 1) range.unshift(1);
    if (range[-1] !== totalPages) range.push(totalPages);

    return range;
  };

  renderNonConsecutiveItem = (item: number, href: string): JSX.Element => {
    this.tempPreviousPage = item;

    return (
      <Fragment key={item}>
        <span className="Pagination-dots Pagination-item">...</span>
        <A className="Pagination-item" href={href} styled frontend>
          {item}
        </A>
      </Fragment>
    );
  };

  renderConsecutiveItem = (item: number, href: string, page: number): JSX.Element => {
    this.tempPreviousPage += 1;

    return (
      <A className="Pagination-item" href={href} key={item} styled disabled={item === page} frontend>
        {item}
      </A>
    );
  };

  renderItems = (item: number, href: string, page: number): JSX.Element => {
    if (this.tempPreviousPage !== item - 1 && item !== 1) {
      return this.renderNonConsecutiveItem(item, href);
    }

    return this.renderConsecutiveItem(item, href, page);
  };

  render = (): JSX.Element => {
    const { page, totalItems, itemsPerPage, path, pageNeighbours, grow } = this.props;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startPage = Math.max(2, page - pageNeighbours);
    const endPage = Math.min(totalPages - 1, page + pageNeighbours);
    const pages = this.createPages(startPage, endPage, totalPages);
    const href = path + '?page=' + page;

    return (
      <div className={'Pagination ' + (grow ? 'Pagination-grow' : '')}>
        <Border className="Pagination-border" padding="small" grow={grow}>
          {pages.map((item) => this.renderItems(item, href, page))}
        </Border>
      </div>
    );
  };
}

export default Pagination;
