import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlossaryState } from 'Modules/Languages/languages.types';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { voteLink } from 'Modules/Links/actions/voteLink';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { UserState } from 'Modules/Users/users.types';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { UserRow as UserRowUi } from './UserRow';

import './UserRow.less';

interface Props {
  id: string;
  user: UserState;
  sessionId: string;
  isLogged: boolean;
  switchLoginModal: () => void;
  slug: string;
  currentGlossary: GlossaryState;
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
  currentGlossary: { since },
}) => {
  const date = new LocaleFormattedDate(createdAt, slug);
  const formattedDate = date.getLocaleFormattedDate();
  const connections = followers?.length || 0 + following?.length || 0;
  const ammountLists = lists?.length || 0;
  const ammountBookmarks = bookmarks?.length || 0;

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
      sinceTranslation={since}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  sessionId: selectSessionUserId,
  isLogged: selectSessionLoggedIn,
  user: selectUserById,
  currentGlossary: selectCurrentGlossary,
  slug: selectCurrentLanguageSlug,
});

export default connect(mapStateToProps, {
  voteLink,
  switchLoginModal,
})(UserRow);
