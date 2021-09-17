import React from 'react';

import BookmarkLists from 'Components/BookmarkLists';
import { RenderInPortal } from 'Components/Portal';
import { Fade, PopOver } from 'Vendor/components';

import './BookmarkListsPopOver.less';

interface Props {
  mounted: boolean;
  bookmarkId: number;
  onListEnter: () => void;
  onListLeave: () => void;
  onCloseClick: () => void;
}

export const BookmarkListsPopOver: React.FC<Props> = ({ mounted, bookmarkId, onListEnter, onListLeave }) => (
  <span className="BookmarkListsPopOver" id={`BookmarkListsPopOver-${bookmarkId}`} onMouseEnter={onListEnter}>
    <RenderInPortal elementId={`BookmarkListsPopOver-portal--${bookmarkId}`}>
      <Fade mounted={mounted} speed="fastest" appear>
        <PopOver elementId={`BookmarkListsPopOver-${bookmarkId}`} placement="right-start">
          <div className="BookmarkListsPopOver-content" onMouseLeave={onListLeave}>
            <BookmarkLists bookmarkId={bookmarkId} />
          </div>
        </PopOver>
      </Fade>
    </RenderInPortal>
  </span>
);
