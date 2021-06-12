import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Bookmark, FadeInOut, Flex, Frame, H4, Hr, Span, Tooltip, Triangle } from 'Vendor/components';
import { SidebarListBookmarksSkeleton } from './SidebarListBookmarksSkeleton';

import './SidebarListBookmarks.less';

interface Props {
  title: string;
  bookmarks: BookmarkState[];
  loading?: boolean;
  href?: string;
}

const SidebarListBookmarks: React.FC<Props> = ({ bookmarks, loading, title, href }) => (
  <Frame className="SidebarListBookmarks" grow borders={false}>
    <A href={href} frontend styled={!!href} disabled={!href}>
      <H4>{title}</H4>
    </A>
    <Hr size="small" spacer />
    <FadeInOut className="SidebarListBookmarks-grid" valueToUpdate={loading} appear>
      {!bookmarks?.length && <Span weight="semiBold">ⵁ Nothing here yet.</Span>}
      {!!bookmarks?.length && loading && <SidebarListBookmarksSkeleton />}
      {!!bookmarks?.length &&
        !loading &&
        bookmarks?.map(({ id, favicon, title, url, statistics }, index) => (
          <React.Fragment key={`${id}-${index}`}>
            <Span className="SidebarListBookmarks-title" weight="semiBold">
              <Flex horizontal="left" vertical="center" noWrap>
                <img className="SidebarListBookmarks-favicon" src={favicon} />
                <A href={url} targetBlank underlined>
                  {title}
                </A>
              </Flex>
            </Span>
            <RenderInPortal>
              <Tooltip
                parentElementId={`${stringToDashCase(title)}-averageVote-${id}`}
                content="Average vote"
                delay={1.5}
              />
            </RenderInPortal>
            <Span
              className="SidebarListBookmarks-descriptionItem"
              id={`${stringToDashCase(title)}-averageVote-${id}`}
              size="small"
            >
              {!!statistics?.averageVote && (
                <>
                  {statistics?.averageVote}
                  <Triangle size="nano" />
                </>
              )}
            </Span>
            <RenderInPortal>
              <Tooltip
                parentElementId={`${stringToDashCase(title)}-timesBookmarked-${id}`}
                content="Times bookmarked"
                delay={1.5}
              />
            </RenderInPortal>
            <Span
              className="SidebarListBookmarks-descriptionItem"
              id={`${stringToDashCase(title)}-timesBookmarked-${id}`}
              size="small"
            >
              {!!statistics?.timesBookmarked && (
                <>
                  {statistics?.timesBookmarked}
                  <Bookmark size="micro" />
                </>
              )}
            </Span>
            {index < bookmarks?.length - 1 && <Hr className="SidebarListBookmarks-spacer" spacer size="micro" />}
          </React.Fragment>
        ))}
    </FadeInOut>
  </Frame>
);

export default SidebarListBookmarks;
