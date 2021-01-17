import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { voteLink } from 'Modules/Links/actions/voteLink';
import { LinkState } from 'Modules/Links/links.types';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { LinkRow as LinkRowUi } from './LinkRow';

import './LinkRow.less';

interface Props extends LinkState {
  voteLink: ({ vote: boolean, linkId: number, userId: string }) => void;
  userId: string;
  isLogged: boolean;
  switchLoginModal: () => void;
}

const LinkRow: React.FC<Props> = ({
  id,
  linkId,
  userId,
  title,
  url,
  tags = [],
  img,
  statistics,
  voteLink,
  isLogged,
  switchLoginModal,
}) => {
  const onVote = (vote) => {
    if (!isLogged) return switchLoginModal();

    voteLink({ vote, linkId: id, userId });
  };

  return (
    <LinkRowUi
      id={id}
      linkId={linkId}
      title={title}
      url={url}
      tags={tags}
      img={img}
      statistics={statistics}
      onVote={onVote}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectSessionUserId,
  isLogged: selectSessionLoggedIn,
});

export default connect(mapStateToProps, {
  voteLink,
  switchLoginModal,
})(LinkRow);
