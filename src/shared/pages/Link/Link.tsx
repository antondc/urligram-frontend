import React from 'react';
import Helmet from 'react-helmet';

import Created from 'Assets/svg/plusCircle.svg';
import Updated from 'Assets/svg/updated.svg';
import BookmarkRow from 'Components/BookmarkRow';
import CardItem from 'Components/CardItem';
import Notes from 'Components/Notes';
import UserRow from 'Components/UserRow';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { NoteState } from 'Modules/Notes/notes.types';
import { UserState } from 'Modules/Users/users.types';
import { SortBy } from '@antoniodcorrea/components';

import './Link.less';

interface Props {
  glossary: GlossaryState;
  notes: NoteState[];
  users: UserState[];
  bookmark: BookmarkState;
  bookmarkOrLinkTitle: string;
  currentHref: string;
  sortNotes: string;
  sortUsers: string;
  onSortNotes: (url: string) => void;
  onSortUsers: (url: string) => void;
}

export const Link: React.FC<Props> = ({
  glossary,
  notes,
  users,
  bookmark,
  bookmarkOrLinkTitle,
  currentHref,
  sortNotes,
  sortUsers,
  onSortNotes,
  onSortUsers,
}) => (
  <>
    <Helmet>
      <title>{bookmarkOrLinkTitle}</title>
      <meta property="og:title" content={bookmarkOrLinkTitle} />
      <meta property="og:url" content={currentHref} />
      <meta property="twitter:title" content={bookmarkOrLinkTitle} />
      <meta property="twitter:url" content={currentHref} />
    </Helmet>
    <div className="Link">
      <CardItem>
        <BookmarkRow id={bookmark?.id} withInfoButton={false} />
      </CardItem>
      <div className="Link-content">
        <div>
          <CardItem className="Link-subHeader">
            <span>{glossary.users}</span>
            <SortBy
              options={[
                { label: glossary.created, field: 'createdAt', icon: Created },
                { label: glossary.updated, field: 'updatedAt', icon: Updated },
              ]}
              href={currentHref}
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
                { label: glossary.created, field: 'createdAt', icon: Created },
                { label: glossary.updated, field: 'updatedAt', icon: Updated },
              ]}
              href={currentHref}
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
