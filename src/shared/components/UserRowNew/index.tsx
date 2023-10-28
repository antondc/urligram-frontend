import React from 'react';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlossaryState } from 'Modules/Languages/languages.types';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { UserState } from 'Modules/Users/users.types';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { UserRowNew as UserRowNewUi } from './UserRowNew';

import './UserRowNew.less';

interface Props {
  id: string;
  user: UserState;
  sessionId: string;
  isLogged: boolean;
  slug: string;
  currentGlossary: GlossaryState;
}

const UserRowNew: React.FC<Props> = ({
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
    bookmarksIds,
    followers,
    following,
  },
  slug,
  currentGlossary: { since },
}) => {
  const date = new LocaleFormattedDate({ unixTime: createdAt, locale: slug });
  const createdAtFormatted = date.getLocaleFormattedDate();
  const connections = followers?.length || 0 + following?.length || 0;
  const ammountLists = lists?.length || 0;
  const ammountBookmarks = bookmarksIds?.length || 0;
  const currentGlossary = useSelector(selectCurrentGlossary);

  return (
    <UserRowNewUi
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
      currentGlossary={currentGlossary}
      connections={connections}
      ammountLists={ammountLists}
      ammountBookmarks={ammountBookmarks}
      createdAtFormatted={createdAtFormatted}
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

export default connect(mapStateToProps)(UserRowNew);
