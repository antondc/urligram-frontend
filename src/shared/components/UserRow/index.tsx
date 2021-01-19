import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { voteLink } from 'Modules/Links/actions/voteLink';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { selectCurrentLanguageSlug } from '../../redux/modules/Languages/selectors/selectCurrentLanguageSlug';
import { UserState } from '../../redux/modules/Users/users.types';
import { LocaleFormattedDate } from '../../tools/utils/Date/localeFormattedDate';
import { UserRow as UserRowUi } from './UserRow';

import './UserRow.less';

interface Props {
  id: string;
  user: UserState;
  sessionId: string;
  isLogged: boolean;
  switchLoginModal: () => void;
  slug: string;
}

const UserRow: React.FC<Props> = ({
  id,
  user: {
    name,
    image,
    level,
    email,
    status,
    statement,
    location,
    order,
    tags,
    createdAt,
    updatedAt,
    lists,
    bookmarks,
    followers,
    following,
  },
  slug,
}) => {
  const date = new LocaleFormattedDate(createdAt, slug);
  const formattedDate = date.getLocaleFormattedDate();
  const connections = followers?.length || 0 + following?.length || 0;
  const ammountLists = lists?.length;
  const ammountBookmarks = bookmarks?.length;

  return (
    <UserRowUi
      id={id}
      name={name}
      image={image}
      level={level}
      email={email}
      status={status}
      statement={statement}
      location={location}
      order={order}
      tags={tags}
      connections={connections}
      ammountLists={ammountLists}
      ammountBookmarks={ammountBookmarks}
      createdAt={formattedDate}
      updatedAt={updatedAt}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  sessionId: selectSessionUserId,
  isLogged: selectSessionLoggedIn,
  user: selectUserById,
  slug: selectCurrentLanguageSlug,
});

export default connect(mapStateToProps, {
  voteLink,
  switchLoginModal,
})(UserRow);
