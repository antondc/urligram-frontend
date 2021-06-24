import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { UserState } from 'Modules/Users/users.types';
import { Fade, Frame, PopOver, Send, SpinnerCircularBrute } from 'Vendor/components';

import './BookmarkRowSend.less';

interface Props {
  sessionId: string;
  bookmark: BookmarkState;
  mounted: boolean;
  itemsLoading: string[];
  followingUsers: UserState[];
  onListEnter: () => void;
  onListLeave: () => void;
  onListsClick: () => void;
  onBookmarkSend: (userId?: string) => void;
  recentlyUpdated: string[];
  onIconLeave: (userId: string) => void;
}

export const BookmarkRowSend: React.FC<Props> = ({
  bookmark,
  mounted,
  followingUsers,
  onListLeave,
  onListEnter,
  onListsClick,
  onBookmarkSend,
  itemsLoading,
  recentlyUpdated,
  onIconLeave,
}) => (
  <span className="BookmarkRowSend" id={`BookmarkRowSend-${bookmark?.id}`}>
    <Send className="BookmarkRowSend-iconSend" size="micro" onClick={onListsClick} />
    <RenderInPortal elementId={`BookmarkRowSend-portal--${bookmark?.id}`}>
      <Fade mounted={mounted}>
        <PopOver elementId={`BookmarkRowSend-${bookmark?.id}`} placement="right-start">
          <Frame onMouseLeave={onListLeave} onMouseEnter={onListEnter}>
            <ul className="BookmarkRowSend-users">
              {followingUsers?.map((item) => {
                const wasRecentlyUpdated = recentlyUpdated?.includes(item?.id);
                const alreadySent = bookmark?.bookmarkSentTo?.some(
                  (bookmarkSent) => bookmarkSent?.receiverId === item?.id
                );

                return (
                  <li
                    className={
                      'BookmarkRowSend-usersItem' +
                      (wasRecentlyUpdated ? ' BookmarkRowSend-usersItem--recentlyUpdated' : '') +
                      (alreadySent ? ' ' + ' BookmarkRowSend-usersItem--alreadySent' : '')
                    }
                    key={item?.id}
                  >
                    <A
                      className="BookmarkRowSend-usersItemText"
                      href={`/users/${item?.id}`}
                      frontend
                      onClick={onListLeave}
                    >
                      @{item?.name}
                    </A>
                    {itemsLoading?.includes(item?.id) ? (
                      <SpinnerCircularBrute className="BookmarkRowSend-usersItemLoader" />
                    ) : (
                      <Send
                        className={'BookmarkRowSend-usersItemIcon'}
                        onClick={(e) => {
                          e.preventDefault();
                          onBookmarkSend(item?.id);
                        }}
                        onMouseLeave={() => onIconLeave(item?.id)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </Frame>
        </PopOver>
      </Fade>
    </RenderInPortal>
  </span>
);

export default BookmarkRowSend;
