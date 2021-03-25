import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { voteLink } from 'Modules/Links/actions/voteLink';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { RootState } from 'Modules/rootType';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { LinkRow as LinkRowUi } from './LinkRow';

import './LinkRow.less';

interface Props {
  id: number;
}

const LinkRow: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const link = useSelector((state: RootState) => selectLinkById(state, { id }));
  const [bookmarkingLoading, setBookmarkingLoading] = useState<boolean>(false);
  const { linkId, title, url, tags = [], favicon, statistics, createdAt, users } = link;
  const date = new LocaleFormattedDate(createdAt, currentLanguageSlug);
  const formattedDate = date.getLocaleFormattedDate();
  const isLogged = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const userBookmarked = users.includes(sessionId);
  const tagsByName = tags?.map((item) => ({ tag: item.name }));

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    dispatch(voteLink({ vote, linkId: id, userId: sessionId }));
  };

  const onBookmark = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    if (!userBookmarked) {
      setBookmarkingLoading(true);
      const result = await dispatch(bookmarkCreate({ title, url, isPrivate: false, tags: tagsByName }));
      if (result.id) return setBookmarkingLoading(false);
    } else {
      //
    }
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
      users={users}
      onVote={onVote}
      onBookmark={onBookmark}
      createdAt={formattedDate}
      userBookmarked={userBookmarked}
      bookmarkingLoading={bookmarkingLoading}
    />
  );
};

export default LinkRow;
