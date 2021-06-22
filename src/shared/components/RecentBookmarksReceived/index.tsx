import React from 'react';
import { useDispatch } from 'react-redux';

import A from 'Components/A';
import { bookmarkViewed } from 'Modules/Shared/actions/bookmarkViewed';
import { NotificationDot } from 'Vendor/components';
import { SharedItemState } from '../../redux/modules/Shared/shared.types';
import { RecentBookmarksReceivedSkeleton } from './RecentBookmarksReceivedSkeleton';

import './RecentBookmarksReceived.less';

interface Props {
  className?: string;
  title: string;
  bookmarks: SharedItemState[];
  loading?: boolean;
  href?: string;
  displayNotifications?: boolean;
}

const RecentBookmarksReceived: React.FC<Props> = ({ bookmarks, loading, title, href, className }) => {
  const dispatch = useDispatch();

  const onBookmarkClick = (bookmarkId: number) => {
    dispatch(bookmarkViewed(bookmarkId));
  };

  if (!bookmarks?.length && !loading) return null;

  return (
    <div className={'RecentBookmarksReceived' + (className ? ' ' + className : '')}>
      <A className="RecentBookmarksReceived-header" href={href} frontend styled={!!href} disabled={!href} underlined>
        {title}
      </A>
      <div className="RecentBookmarksReceived-list">
        {!!loading && <RecentBookmarksReceivedSkeleton />}
        {!loading &&
          bookmarks?.map(({ bookmarkId, favicon, title, url, viewed }) => (
            <div className="RecentBookmarksReceived-item" key={bookmarkId} onClick={() => onBookmarkClick(bookmarkId)}>
              <span className="RecentBookmarksReceived-title">
                <img className="RecentBookmarksReceived-favicon" src={favicon} />
                <A className="RecentBookmarksReceived-link" href={url} targetBlank underlined>
                  {title}
                </A>
              </span>
              <NotificationDot className="RecentBookmarksReceived-notification" type={viewed ? 'success' : 'alert'} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentBookmarksReceived;
