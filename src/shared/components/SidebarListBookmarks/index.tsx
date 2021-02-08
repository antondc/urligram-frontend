import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { stringToDashCase } from 'Tools/utils/string/stringToDashCase';
import { Hr, Span, Tooltip } from '@antoniodcorrea/components';
import { SidebarListBookmarksSkeleton } from './SidebarListBookmarksSkeleton';

import './SidebarListBookmarks.less';

interface Props {
  items: BookmarkState[];
  loading?: boolean;
  title?: string;
}

const SidebarListBookmarks: React.FC<Props> = ({ items, loading, title: blockTitle }) => (
  <dl className="SidebarListBookmarks-bookmarks">
    {!loading ? (
      items.map(({ id, title, statistics, linkId }, index) => (
        <React.Fragment key={id}>
          {!!index && <Hr spacer size="micro" />}
          <dd className="SidebarListBookmarks-bookmark">
            <A href={`links/${linkId}`} frontend>
              <Span bold>⚭ {title}</Span>
            </A>
            <div>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(blockTitle)}-timesVoted-${id}`}
                  content="Times voted"
                  delay={1.5}
                />
              </RenderInPortal>
              <Span
                className="SidebarListBookmarks-detail"
                id={`${stringToDashCase(blockTitle)}-timesVoted-${id}`}
                size="small"
              >
                {statistics?.timesVoted}
              </Span>
              <> · </>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(blockTitle)}-averageVote-${id}`}
                  content="Average vote"
                  delay={1.5}
                />
              </RenderInPortal>
              <Span
                className="SidebarListBookmarks-detail"
                id={`${stringToDashCase(blockTitle)}-averageVote-${id}`}
                size="small"
              >
                {statistics?.averageVote}
              </Span>
              <> · </>
              <RenderInPortal>
                <Tooltip
                  parentElementId={`${stringToDashCase(blockTitle)}-timesBookmarked-${id}`}
                  content="Times bookmarked"
                  delay={1.5}
                />
              </RenderInPortal>
              <Span
                className="SidebarListBookmarks-detail"
                id={`${stringToDashCase(blockTitle)}-timesBookmarked-${id}`}
                size="small"
              >
                {statistics?.timesBookmarked}
              </Span>
            </div>
          </dd>
        </React.Fragment>
      ))
    ) : (
      <SidebarListBookmarksSkeleton />
    )}
  </dl>
);

export default SidebarListBookmarks;
