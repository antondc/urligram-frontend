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
      <A href={href} frontend styled={!!href} disabled={!href} underlined>
        <H4>{title}</H4>
      </A>
      <Hr size="small" spacer />
      <div className="SidebarListBookmarks-grid">
        {!!loading && <SidebarListBookmarksSkeleton />}
        {!loading &&
          bookmarks?.map(({ id, favicon, title, url, statistics }, index) => (
            <React.Fragment key={`${id}-${index}`}>
              <span className="SidebarListBookmarks-title">
                <img className="SidebarListBookmarks-favicon" src={favicon} />
                <A href={url} targetBlank underlined>
                  {title}
                </A>
              </span>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(title)}-averageVote-${id}`}
                  content="Average vote"
                  delay={1.5}
                />
              </RenderInPortal>
              <span
                className="SidebarListBookmarks-descriptionItem"
                id={`${stringToDashCase(title)}-averageVote-${id}`}
              >
                {!!statistics?.averageVote && (
                  <>
                    {statistics?.averageVote}
                    <Triangle size="nano" />
                  </>
                )}
              </span>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(title)}-timesBookmarked-${id}`}
                  content="Times bookmarked"
                  delay={1.5}
                />
              </RenderInPortal>
              <span
                className="SidebarListBookmarks-descriptionItem"
                id={`${stringToDashCase(title)}-timesBookmarked-${id}`}
              >
                {!!statistics?.timesBookmarked && (
                  <>
                    {statistics?.timesBookmarked}
                    <Bookmark size="micro" />
                  </>
                )}
              </span>
              {index < bookmarks?.length - 1 && <Hr className="SidebarListBookmarks-spacer" spacer size="micro" />}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default SidebarListBookmarks;
