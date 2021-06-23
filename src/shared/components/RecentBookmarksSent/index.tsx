import React, { useEffect, useState } from 'react';

import A from 'Components/A';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { LocalStorageWrapper } from 'Services/LocalStorageWrapper';
import { AnimateHeight, Space, Triangle } from 'Vendor/components';
import { RecentBookmarksSentSkeleton } from './RecentBookmarksSentSkeleton';

import './RecentBookmarksSent.less';

type LocalStorageSentShown = { mounted: boolean; expires: number };

interface Props {
  className?: string;
  title: string;
  bookmarks: BookmarkState[];
  loading?: boolean;
  href?: string;
  displayNotifications?: boolean;
}

const RecentBookmarksSent: React.FC<Props> = ({ bookmarks, loading, title, href, className }) => {
  const localStorageWrapper = new LocalStorageWrapper();
  const [shown, setShown] = useState<boolean>(false);
  const timeMsInFourHours = Date.now() + 4 * 60 * 60 * 1000;

  const onListTitleClick = () => {
    const nextValue = !shown;
    const nextValueLocalStorage = !!nextValue ? true : false;
    setShown(nextValue);
    localStorageWrapper.setValue('bookmarksSentShown', { mounted: nextValueLocalStorage }, timeMsInFourHours);
  };

  useEffect(() => {
    const sidebarLeftListsShown = localStorageWrapper.getValue<LocalStorageSentShown>('bookmarksSentShown');

    setShown(Boolean(sidebarLeftListsShown?.mounted));
  }, []);

  if (!bookmarks?.length && !loading) return null;

  return (
    <div className={'RecentBookmarksSent' + (className ? ' ' + className : '')}>
      <div className="RecentBookmarksSent-header" onClick={onListTitleClick}>
        <A href={href} frontend styled={!!href} disabled={!href} underlined>
          {title}
        </A>
        <Space />
        <Triangle
          className={'RecentBookmarksSent-triangle' + (shown ? ' RecentBookmarksSent-triangle--show' : '')}
          size="pico"
        />
      </div>
      <AnimateHeight mounted={shown} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
        <div className="RecentBookmarksSent-list">
          {!!loading && <RecentBookmarksSentSkeleton />}
          {!loading &&
            bookmarks?.map(({ id, favicon, title, url }) => (
              <div className="RecentBookmarksSent-item" key={id}>
                <span className="RecentBookmarksSent-title">
                  <img className="RecentBookmarksSent-favicon" src={favicon} />
                  <A className="RecentBookmarksSent-link" href={url} targetBlank underlined>
                    {title}
                  </A>
                </span>
              </div>
            ))}
        </div>
      </AnimateHeight>
    </div>
  );
};

export default RecentBookmarksSent;
