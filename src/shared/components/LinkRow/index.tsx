import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { voteLink } from 'Modules/Links/actions/voteLink';
import { LinkState } from 'Modules/Links/links.types';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { LinkRow as LinkRowUi } from './LinkRow';

import './LinkRow.less';

interface Props {
  id: number;
  link: LinkState;
  voteLink: ({ vote: boolean, linkId: number, userId: string }) => void;
  userId: string;
  isLogged: boolean;
  switchLoginModal: (mount: boolean) => void;
}

const LinkRow: React.FC<Props> = ({
  id,
  link: { linkId, title, url, tags = [], favicon, statistics },
  userId,
  isLogged,
  switchLoginModal,
  voteLink,
}) => {
  const onVote = (vote) => {
    if (!isLogged) return switchLoginModal(true);

    voteLink({ vote, linkId: id, userId });
  };

  return (
    <LinkRowUi
      id={id}
      linkId={linkId}
      title={title}
      url={url}
      tags={tags}
      favicon={favicon}
      statistics={statistics}
      onVote={onVote}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectSessionUserId,
  isLogged: selectSessionLoggedIn,
  link: selectLinkById,
});

export default connect(mapStateToProps, {
  voteLink,
  switchLoginModal,
})(LinkRow);
