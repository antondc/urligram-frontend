import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { voteLink } from 'Modules/Links/actions/voteLink';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { selectUserById } from 'Modules/Users/selectors/selectUserById';
import { UserState } from '../../redux/modules/Users/users.types';
import { UserRow as UserRowUi } from './UserRow';

import './UserRow.less';

interface Props {
  id: string;
  user: UserState;
  sessionId: string;
  isLogged: boolean;
  switchLoginModal: () => void;
}

const UserRow: React.FC<Props> = ({
  id,
  user: { name, image, level, email, status, statement, location, order, tags, createdAt, updatedAt },
}) => (
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
    createdAt={createdAt}
    updatedAt={updatedAt}
  />
);

const mapStateToProps = createStructuredSelector({
  sessionId: selectSessionUserId,
  isLogged: selectSessionLoggedIn,
  user: selectUserById,
});

export default connect(mapStateToProps, {
  voteLink,
  switchLoginModal,
})(UserRow);
