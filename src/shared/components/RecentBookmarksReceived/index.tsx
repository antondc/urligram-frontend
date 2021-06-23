import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import BookmarkActions from 'Components/BookmarkActions';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { bookmarkViewed } from 'Modules/Shared/actions/bookmarkViewed';
import history from 'Services/History';
import { LocalStorageWrapper } from 'Services/LocalStorageWrapper';
import { AnimateHeight, FadeInOut, NotificationDot, Space, Triangle } from 'Vendor/components';
import { RecentBookmarksReceivedSkeleton } from './RecentBookmarksReceivedSkeleton';

import './RecentBookmarksReceived.less';

type LocalStorageReceivedShown = { mounted: boolean; expires: number };

interface Props {
  className?: string;
  title: string;
  bookmarks: BookmarkState[];
  loading?: boolean;
  href?: string;
  displayNotifications?: boolean;
}

const RecentBookmarksReceived: React.FC<Props> = ({ bookmarks, loading, title, href, className }) => {
  const dispatch = useDispatch();
  const localStorageWrapper = new LocalStorageWrapper();
  const [shown, setShown] = useState<boolean>(false);
  const timeMsInFourHours = Date.now() + 4 * 60 * 60 * 1000;
  const session = useSelector(selectSession);

  const onBookmarkClick = (id: number) => {
    dispatch(bookmarkViewed(id));
  };

  const onListTitleClick = (): void => {
    const nextValue = !shown;
    const nextValueLocalStorage = !!nextValue ? true : false;
    setShown(nextValue);
    localStorageWrapper.setValue('bookmarksReceivedShown', { mounted: nextValueLocalStorage }, timeMsInFourHours);
  };

  const onBookmarked = (): void => {
    history.push(`/users/${session?.id}/bookmarks?sort=-createdAt`);
  };

  useEffect(() => {
    const sidebarLeftListsShown = localStorageWrapper.getValue<LocalStorageReceivedShown>('bookmarksReceivedShown');

    setShown(Boolean(sidebarLeftListsShown?.mounted));
  }, []);

  if (!bookmarks?.length && !loading) return null;

  return (
    <div className={'RecentBookmarksReceived' + (className ? ' ' + className : '')}>
      <div className="RecentBookmarksReceived-header" onClick={onListTitleClick}>
        <A href={href} frontend styled={!!href} disabled={!href} underlined>
          {title}
        </A>
        <Space />
        <Triangle
          className={'RecentBookmarksReceived-triangle' + (shown ? ' RecentBookmarksReceived-triangle--show' : '')}
          size="pico"
        />
      </div>
      <AnimateHeight mounted={shown} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
        <div className="RecentBookmarksReceived-list">
          {!!loading && <RecentBookmarksReceivedSkeleton />}
          {!loading &&
            bookmarks?.map(({ id, linkId, favicon, title, url, users, bookmarkReceivedFrom }) => {
              const userBookmarked = users.includes(session?.id);

              return (
                <FadeInOut
                  className="RecentBookmarksReceived-item"
                  valueToUpdate={userBookmarked}
                  speed="normalSlow"
                  key={id}
                  appear
                  onClick={() => onBookmarkClick(id)}
                >
                  {!userBookmarked && (
                    <>
                      <span className="RecentBookmarksReceived-title">
                        <img className="RecentBookmarksReceived-favicon" src={favicon} />
                        <A className="RecentBookmarksReceived-link" href={url} targetBlank underlined>
                          {title}
                        </A>
                      </span>
                      <NotificationDot
                        className="RecentBookmarksReceived-notification"
                        type={bookmarkReceivedFrom && bookmarkReceivedFrom[0]?.viewed ? 'success' : 'alert'}
                      />
                      <BookmarkActions
                        className="RecentBookmarksReceived-bookmarkIcon"
                        bookmarkId={id}
                        linkId={linkId}
                        onBookmarked={onBookmarked}
                      />
                    </>
                  )}
                </FadeInOut>
              );
            })}
        </div>
      </AnimateHeight>
    </div>
  );
};

export default RecentBookmarksReceived;
