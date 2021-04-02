import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { linkUpdateVote } from 'Modules/Links/actions/linkUpdateVote';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { RootState } from 'Modules/rootType';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { LinkRow as LinkRowUi } from './LinkRow';

import './LinkRow.less';

interface Props {
  id: number;
}

const LinkRow: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const link = useSelector((state: RootState) => selectLinkById(state, { id }));
  const { linkId, title, url, tags = [], favicon, statistics, bookmarksRelated } = link;
  const isLogged = useSelector(selectSessionLoggedIn);
  const userBookmarked = bookmarksRelated?.some((item) => item?.userId === sessionId);

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    dispatch(linkUpdateVote({ vote, linkId: id, userId: sessionId }));
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
      bookmarksRelated={bookmarksRelated}
      onVote={onVote}
      userBookmarked={userBookmarked}
    />
  );
};

export default LinkRow;
