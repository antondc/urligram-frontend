import React from 'react';

import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { LinkState } from 'Modules/Links/links.types';
import { NoteState } from 'Modules/Notes/notes.types';
import { UserState } from 'Modules/Users/users.types';

import './Link.less';

interface Props {
  link: LinkState;
  notes: NoteState[];
  users: UserState[];
  bookmark: BookmarkState;
}

export const Link: React.FC<Props> = ({ link, notes, users, bookmark }) => (
  <div className="Link">
    <BookmarkRow id={bookmark?.id} withInfoButton={false} />
    <hr />
    <div>linkid: {link?.id}</div>
    <div>notes: {notes.length}</div>
    <div>users: {users?.length}</div>
  </div>
);
