import React from 'react';

import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { Border, Fade, List, PlusCircleWithBackground, PopOver, Span, SpinnerLoader } from '@antoniodcorrea/components';

import './BookmarkLists.less';

interface Props {
  bookmarkId: number;
  mounted: boolean;
  lists: ListState[];
  listsLoading: number[];
  onListEnter: () => void;
  onListLeave: () => void;
  onListsClick: () => void;
  onListAdd: ({ listId }: { listId: number }) => void;
}

export const BookmarkLists: React.FC<Props> = ({
  bookmarkId,
  mounted,
  lists,
  listsLoading,
  onListLeave,
  onListEnter,
  onListsClick,
  onListAdd,
}) => (
  <span className="BookmarkLists" id={`BookmarkLists-${bookmarkId}`}>
    <List className="BookmarkLists-listIcon" size="small" onClick={onListsClick} />
    <RenderInPortal elementId={`BookmarkLists-portal--${bookmarkId}`}>
      <Fade mounted={mounted}>
        <PopOver elementId={`BookmarkLists-${bookmarkId}`} placement="right-start">
          <Border onMouseLeave={onListLeave} onMouseEnter={onListEnter}>
            <ul className="BookmarkLists-lists">
              {lists?.map((item, index) => (
                <li className="BookmarkLists-listsItem" key={index}>
                  <Span className="BookmarkList-listsItemText" bold>
                    {item.name}
                  </Span>
                  {listsLoading?.includes(item.id) ? (
                    <SpinnerLoader className="BookmarkLists-listsItemIconLoader" />
                  ) : (
                    <PlusCircleWithBackground
                      className="BookmarkLists-listsItemIcon"
                      onClick={() => onListAdd({ listId: item.id })}
                    />
                  )}
                </li>
              ))}
              <li className="BookmarkLists-listsItem">
                <Span className="BookmarkList-listsItemText" bold>
                  Create list
                </Span>
                <PlusCircleWithBackground className="BookmarkLists-listsItemIcon" />
              </li>
            </ul>
          </Border>
        </PopOver>
      </Fade>
    </RenderInPortal>
  </span>
);

export default BookmarkLists;
