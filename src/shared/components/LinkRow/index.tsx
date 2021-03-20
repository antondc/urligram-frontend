import React from 'react';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { voteLink } from 'Modules/Links/actions/voteLink';
import { LinkState } from 'Modules/Links/links.types';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
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
  link: { linkId, title, url, tags = [], favicon, statistics, createdAt, users },
  userId,
  isLogged,
  switchLoginModal,
  voteLink,
}) => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const date = new LocaleFormattedDate(createdAt, currentLanguageSlug);
  const formattedDate = date.getLocaleFormattedDate();
  const sessionId = useSelector(selectSessionUserId);
  const userBookmarked = users.includes(sessionId);

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
      createdAt={formattedDate}
      userBookmarked={userBookmarked}
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
