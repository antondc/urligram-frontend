import React from 'react';

import A from 'Components/A';
import { NotificationDot } from 'Vendor/components';
import { SharedItemState } from '../../redux/modules/Shared/shared.types';
import { RecentBookmarksSentSkeleton } from './RecentBookmarksSentSkeleton';

import './RecentBookmarksSent.less';

interface Props {
  className?: string;
  title: string;
  bookmarks: SharedItemState[];
  loading?: boolean;
  href?: string;
  displayNotifications?: boolean;
}

const RecentBookmarksSent: React.FC<Props> = ({ bookmarks, loading, title, href, className }) => {
  if (!bookmarks?.length && !loading) return null;

  return (
    <div className={'RecentBookmarksSent' + (className ? ' ' + className : '')}>
      <A className="RecentBookmarksSent-header" href={href} frontend styled={!!href} disabled={!href} underlined>
        {title}
      </A>
      <div className="RecentBookmarksSent-list">
        {!!loading && <RecentBookmarksSentSkeleton />}
        {!loading &&
          bookmarks?.map(({ bookmarkId, favicon, title, url, viewed }) => (
            <div className="RecentBookmarksSent-item" key={bookmarkId}>
              <span className="RecentBookmarksSent-title">
                <img className="RecentBookmarksSent-favicon" src={favicon} />
                <A className="RecentBookmarksSent-link" href={url} targetBlank underlined>
                  {title}
                </A>
              </span>
              <NotificationDot className="RecentBookmarksSent-notification" type={viewed ? 'success' : 'alert'} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentBookmarksSent;
