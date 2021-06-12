import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Bookmark, FadeInOut, Frame, H4, Hr, Span, Tooltip, Triangle } from 'Vendor/components';
import { SidebarListBookmarksRefactorSkeleton } from './SidebarListBookmarksRefactorSkeleton';

import './SidebarListBookmarksRefactor.less';

interface Props {
  bookmarks: BookmarkState[];
  loading?: boolean;
  title?: string;
  href?: string;
}

const SidebarListBookmarksRefactor: React.FC<Props> = ({ bookmarks, loading, title, href }) => (
  <Frame className="SidebarListBookmarksRefactor" grow borders={false}>
    <A href={href} frontend styled={!!href} disabled={!href}>
      <H4>{title}</H4>
    </A>
    <Hr size="small" spacer />
    <FadeInOut className="SidebarListBookmarksRefactor-grid" valueToUpdate={loading} appear>
      {!bookmarks?.length && <Span weight="semiBold">ⵁ Nothing here yet.</Span>}
      {!!bookmarks?.length && loading && <SidebarListBookmarksRefactorSkeleton />}
      {!!bookmarks?.length &&
        !loading &&
        bookmarks?.map(({ id, title, url, statistics }, index) => (
          <React.Fragment key={`${id}-${index}`}>
            <Span className="SidebarListBookmarksRefactor-title" weight="semiBold">
              <A href={url} targetBlank underlined>
                {title}
              </A>
            </Span>
            <RenderInPortal>
              <Tooltip
                parentElementId={`${stringToDashCase(title)}-averageVote-${id}`}
                content="Average vote"
                delay={1.5}
              />
            </RenderInPortal>
            <Span
              className="SidebarListBookmarksRefactor-descriptionItem"
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
              className="SidebarListBookmarksRefactor-descriptionItem"
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
            {index < bookmarks?.length - 1 && (
              <Hr className="SidebarListBookmarksRefactor-spacer" spacer size="micro" />
            )}
          </React.Fragment>
        ))}
    </FadeInOut>
  </Frame>
);

export default SidebarListBookmarksRefactor;
