import React from 'react';

import Bookmark from 'Assets/svg/bookmark.svg';
import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Tooltip } from 'Vendor/components';
import { SidebarListBookmarksSkeleton } from './SidebarListBookmarksSkeleton';

import './SidebarListBookmarks.less';

interface Props {
  className?: string;
  title: string;
  bookmarks: BookmarkState[];
  loading?: boolean;
  href?: string;
}

const SidebarListBookmarks: React.FC<Props> = ({ bookmarks, loading, title, href, className }) => {
  if (!bookmarks?.length && !loading) return null;

  return (
    <div className={'SidebarListBookmarks' + (className ? ' ' + className : '')}>
      <A className="SidebarListBookmarks-header" href={href} frontend styled={!!href} disabled={!href} underlined>
        {title}
      </A>
      <div className="SidebarListBookmarks-grid">
        {!!loading && <SidebarListBookmarksSkeleton />}
        {!loading &&
          bookmarks?.map((item, index) => (
            <React.Fragment key={`${item?.id}-${index}`}>
              <span className="SidebarListBookmarks-title">
                <img className="SidebarListBookmarks-favicon" src={item?.favicon} />
                <A className="SidebarListBookmarks-link" href={item?.url} targetBlank underlined>
                  {item?.title}
                </A>
              </span>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(item?.title)}-timesBookmarked-${item?.id}`}
                  content="Times bookmarked"
                  delay={1.5}
                />
              </RenderInPortal>
              <span
                className="SidebarListBookmarks-descriptionItem"
                id={`${stringToDashCase(item?.title)}-timesBookmarked-${item?.id}`}
              >
                {!!item?.statistics?.timesBookmarked && (
                  <>
                    {item?.statistics?.timesBookmarked}
                    <Bookmark className="SidebarListBookmarks-icon" />
                  </>
                )}
              </span>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default SidebarListBookmarks;
