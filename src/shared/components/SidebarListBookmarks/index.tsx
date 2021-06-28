import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Bookmark, H4, Hr, Tooltip, Triangle } from 'Vendor/components';
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
                  {title}
                </A>
              </span>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(title)}-averageVote-${item?.id}`}
                  content="Average vote"
                  delay={1.5}
                />
              </RenderInPortal>
              <span
                className="SidebarListBookmarks-descriptionItem"
                id={`${stringToDashCase(title)}-averageVote-${item?.id}`}
              >
                {!!item?.statistics?.averageVote && (
                  <>
                    {item?.statistics?.averageVote}
                    <Triangle size="nano" />
                  </>
                )}
              </span>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(title)}-timesBookmarked-${item?.id}`}
                  content="Times bookmarked"
                  delay={1.5}
                />
              </RenderInPortal>
              <span
                className="SidebarListBookmarks-descriptionItem"
                id={`${stringToDashCase(title)}-timesBookmarked-${item?.id}`}
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
