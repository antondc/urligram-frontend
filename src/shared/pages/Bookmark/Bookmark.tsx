import React from 'react';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';

import './Bookmark.less';

interface Props {
  bookmark: BookmarkState;
}

export const Bookmark: React.FC<Props> = ({ bookmark }) => (
  <div className="Bookmark">
    BOOKMARK PAGE: <pre>{JSON.stringify(bookmark, null, 4)}</pre>
  </div>
);
