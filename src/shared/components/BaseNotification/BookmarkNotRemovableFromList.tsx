import React from 'react';

import './BookmarkNotRemovableFromList.less';

const BookmarkNotRemovableFromList: React.FC = () => (
  <div className="BookmarkNotRemovableFromList">
    <div className="BookmarkNotRemovableFromList-title">You can not remove this bookmark from this list.</div>
    <div className="BookmarkNotRemovableFromList-text">This bookmark is probably from a list you do not manage.</div>
  </div>
);

export default BookmarkNotRemovableFromList;
