import React from 'react';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { NoteState } from 'Modules/Notes/notes.types';
import { UserState } from 'Modules/Users/users.types';

import './Bookmark.less';

interface Props {
  bookmark: BookmarkState;
  notes: NoteState[];
  users: UserState[];
}

export const Bookmark: React.FC<Props> = ({ bookmark, notes, users }) => (
  <div className="Bookmark">
    Bookmark PAGE:
    <hr />
    <hr />
    <pre>{JSON.stringify(bookmark, null, 4)}</pre>
    <hr />
    <hr />
    <pre>{JSON.stringify(notes, null, 4)}</pre>
    <hr />
    <hr />
    <pre>{JSON.stringify(users, null, 4)}</pre>
    <hr />
    <hr />
  </div>
);
