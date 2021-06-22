import React from 'react';

import A from 'Components/A';
import Clock from 'Components/Clock';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { Space } from 'Vendor/components';

import './HeaderSecond.less';

interface Props {
  formattedDate: string;
  bookmarks: BookmarkState[];
}

export const HeaderSecond: React.FC<Props> = ({ formattedDate, bookmarks }) => (
  <div className="HeaderSecond">
    <div className="HeaderSecond-item HeaderSecond-main">
      {bookmarks.map((bookmark, index) => (
        <div className="HeaderSecond-bookmarkItem" key={bookmark.id}>
          <A className="HeaderSecond-title" href={bookmark?.url} targetBlank underlined>
            {bookmark?.title}
          </A>
          {index !== bookmarks.length - 1 && (
            <>
              <Space />
              ·
              <Space />
            </>
          )}
        </div>
      ))}
    </div>
    <div className="HeaderSecond-item HeaderSecond-date">{formattedDate}</div>
    <div className="HeaderSecond-item HeaderSecond-clock">
      <Clock />
    </div>
  </div>
);
