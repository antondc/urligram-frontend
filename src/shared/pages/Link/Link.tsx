import React from 'react';
import Helmet from 'react-helmet';

import Created from 'Assets/svg/plusCircle.svg';
import Updated from 'Assets/svg/updated.svg';
import BookmarkRow from 'Components/BookmarkRow';
import CardItem from 'Components/CardItem';
import Notes from 'Components/Notes';
import UserRow from 'Components/UserRow';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { NoteState } from 'Modules/Notes/notes.types';
import { UserState } from 'Modules/Users/users.types';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { SortBy } from '@antoniodcorrea/components';

import './Link.less';

interface Props {
  notes: NoteState[];
  users: UserState[];
  bookmark: BookmarkState;
  bookmarkOrLinkTitle: string;
  url: string;
  sortNotes: string;
  sortUsers: string;
  onSortNotes: (url: string) => void;
  onSortUsers: (url: string) => void;
}

export const Link: React.FC<Props> = ({
  notes,
  users,
  bookmark,
  bookmarkOrLinkTitle,
  url,
  sortNotes,
  sortUsers,
  onSortNotes,
  onSortUsers,
}) => (
  <>
    <Helmet>
      <title>{`${SITE_TITLE} · ${bookmarkOrLinkTitle}`}</title>
      <meta property="og:title" content={`${SITE_TITLE} · ${bookmarkOrLinkTitle}`} />
      <meta property="og:url" content={url} />
      <meta property="twitter:title" content={`${SITE_TITLE} · ${bookmarkOrLinkTitle}`} />
      <meta property="twitter:url" content={url} />
    </Helmet>
    <div className="Link">
      <CardItem>
        <BookmarkRow id={bookmark?.id} withInfoButton={false} />
      </CardItem>
      <div className="Link-content">
        <div>
          <CardItem className="Link-subHeader">
            <span>Users</span>
            <SortBy
              options={[
                { label: 'Created', field: 'createdAt', icon: Created },
                { label: 'Updated', field: 'updatedAt', icon: Updated },
              ]}
              href={url}
              currentSort={sortUsers}
              loading={false}
              onItemClick={onSortUsers}
            />
          </CardItem>
          {users?.map((item) => (
            <CardItem key={item.id}>
              <UserRow id={item.id} />
            </CardItem>
          ))}
        </div>
        <div>
          <CardItem className="Link-subHeader">
            <span>Notes</span>
            <SortBy
              options={[
                { label: 'Created', field: 'createdAt', icon: Created },
                { label: 'Updated', field: 'updatedAt', icon: Updated },
              ]}
              href={url}
              currentSort={sortNotes}
              loading={false}
              onItemClick={onSortNotes}
            />
          </CardItem>
          {notes?.map((item) => (
            <Notes text={item.notes} userName={item.userName} userId={item.userId} key={item.notes} />
          ))}
        </div>
      </div>
    </div>
  </>
);
