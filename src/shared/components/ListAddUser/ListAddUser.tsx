import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import { UserState } from 'Modules/Users/users.types';
import {
  EditCircle,
  Eye,
  Fade,
  Frame,
  PlusCircle,
  PlusCircleWithBackground,
  PopOver,
  SpinnerPie,
} from 'Vendor/components';

import './ListAddUser.less';

interface Props {
  sessionId: string;
  list: ListState;
  mounted: boolean;
  itemsLoadingReader: string[];
  itemsLoadingEditor: string[];
  itemsLoadingRemove: string[];
  followingUsers: UserState[];
  onListEnter: () => void;
  onListLeave: () => void;
  onListsClick: (e: React.MouseEvent) => void;
  onInviteAsReader: (userId?: string) => void;
  onInviteAsEditor: (userId?: string) => void;
  onRemoveFromList: (userId?: string) => void;
  readerRecentlyUpdated: string[];
  editorRecentlyUpdated: string[];
  deleteRecentlyUpdated: string[];
  onIconReaderLeave: (userId: string) => void;
  onIconEditorLeave: (userId: string) => void;
}

export const ListAddUser: React.FC<Props> = ({
  mounted,
  list,
  followingUsers,
  onListLeave,
  onListEnter,
  onListsClick,
  onInviteAsReader,
  onInviteAsEditor,
  onRemoveFromList,
  itemsLoadingReader,
  itemsLoadingEditor,
  itemsLoadingRemove,
  // readerRecentlyUpdated,
  // editorRecentlyUpdated,
  // deleteRecentlyUpdated,
  onIconReaderLeave,
  onIconEditorLeave,
}) => (
  <div className="ListAddUser" id="ListAddUser">
    <PlusCircle className="ListAddUser-iconSend" onClick={onListsClick} />
    <RenderInPortal elementId="ListAddUser-portal">
      <Fade mounted={mounted}>
        <PopOver elementId="ListAddUser" placement="right-start">
          <Frame onMouseLeave={onListLeave} onMouseEnter={onListEnter}>
            <ul className="ListAddUser-users">
              {followingUsers?.map((item, index) => {
                const userIsReader = list?.members?.some(
                  (member) => member?.userRole === 'reader' && member?.id === item?.id
                );
                const userIsReaderPending = list?.members?.some(
                  (member) =>
                    member?.userRole === 'reader' && member?.id === item?.id && member?.userListStatus === 'pending'
                );
                const userIsEditor = list?.members?.some(
                  (member) => member?.userRole === 'editor' && member?.id === item?.id
                );
                const userIsEditorPending = list?.members?.some(
                  (member) =>
                    member?.userRole === 'editor' && member?.id === item?.id && member?.userListStatus === 'pending'
                );

                // const wasRecentlyUpdated = recentlyUpdated?.includes(item?.id);
                // const userAlreadyInList = list?.bookmarkSentTo?.some((bookmarkSent) => bookmarkSent?.receiverId === item?.id);
                return (
                  <li
                    className={
                      'ListAddUser-usersItem' +
                      (userIsReader ? ' ListAddUser-usersItem--userIsReader' : '') +
                      (userIsReaderPending ? ' ListAddUser-usersItem--userIsReaderPending' : '') +
                      (userIsEditor ? ' ListAddUser-usersItem--userIsEditor' : '') +
                      (userIsEditorPending ? ' ListAddUser-usersItem--userIsEditorPending' : '')
                      // + (wasRecentlyUpdated ? ' ListAddUser-usersItem--recentlyUpdated' : '')
                      // (alreadySent ? ' ' + ' ListAddUser-usersItem--alreadySent' : '')
                    }
                    key={index}
                  >
                    <A className="ListAddUser-usersItemText" href={`/users/${item?.id}`} frontend onClick={onListLeave}>
                      @{item?.name}
                    </A>
                    {itemsLoadingReader?.includes(item?.id) ? (
                      <SpinnerPie className="ListAddUser-usersItemLoader" />
                    ) : (
                      <Eye
                        className="ListAddUser-usersItemIcon ListAddUser-usersItemIconReader"
                        onClick={(e) => {
                          e.preventDefault();
                          onInviteAsReader(item?.id);
                        }}
                        onMouseLeave={() => onIconReaderLeave(item?.id)}
                      />
                    )}
                    {itemsLoadingEditor?.includes(item?.id) ? (
                      <SpinnerPie className="ListAddUser-usersItemLoader" />
                    ) : (
                      <EditCircle
                        className="ListAddUser-usersItemIcon ListAddUser-usersItemIconEditor"
                        onClick={(e) => {
                          e.preventDefault();
                          onInviteAsEditor(item?.id);
                        }}
                        onMouseLeave={() => onIconEditorLeave(item?.id)}
                      />
                    )}
                    {itemsLoadingRemove?.includes(item?.id) ? (
                      <SpinnerPie className="ListAddUser-usersItemLoader" />
                    ) : (
                      <PlusCircleWithBackground
                        className={
                          'ListAddUser-usersItemIcon ListAddUser-usersItemIconRemoveFromList' +
                          (userIsReader || userIsEditor || userIsReaderPending || userIsEditorPending
                            ? ' ListAddUser-usersItemIconRemoveFromList--active'
                            : ' ListAddUser-usersItemIconRemoveFromList--inactive')
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          onRemoveFromList(item?.id);
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </Frame>
        </PopOver>
      </Fade>
    </RenderInPortal>
  </div>
);

export default ListAddUser;
