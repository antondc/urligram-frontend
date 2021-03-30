import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { linkUpdateVote } from 'Modules/Links/actions/linkUpdateVote';
import { selectLinkById } from 'Modules/Links/selectors/selectLinkById';
import { RootState } from 'Modules/rootType';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { bookmarkDelete } from '../../redux/modules/Bookmarks/actions/bookmarkDelete';
import { selectBookmarkByLinkIdAndUserId } from '../../redux/modules/Bookmarks/selectors/selectBookmarkByLinkIdAndUserId';
import { LinkRow as LinkRowUi } from './LinkRow';

import './LinkRow.less';

interface Props {
  id: number;
}

const LinkRow: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionUserId);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const link = useSelector((state: RootState) => selectLinkById(state, { id }));
  const { id: bookmarkId } = useSelector((state: RootState) =>
    selectBookmarkByLinkIdAndUserId(state, { linkId: link?.id, userId: sessionId })
  );
  const [bookmarkingLoading, setBookmarkingLoading] = useState<boolean>(false);
  const [isBookmarkDeletePending, setIsBookmarkDeletePending] = useState<boolean>(false);
  const { linkId, title, url, tags = [], favicon, statistics, createdAt, users } = link;
  const date = new LocaleFormattedDate({ unixTime: createdAt, locale: currentLanguageSlug });
  const createdAtFormatted = date.getLocaleFormattedDate();
  const isLogged = useSelector(selectSessionLoggedIn);
  const userBookmarked = users.includes(sessionId);
  const tagsByName = tags?.map((item) => ({ tag: item.name }));

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    dispatch(linkUpdateVote({ vote, linkId: id, userId: sessionId }));
  };

  const onBookmarkGrab = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    if (!userBookmarked) {
      setBookmarkingLoading(true);
      const result = await dispatch(bookmarkCreate({ title, url, isPrivate: false, tags: tagsByName }));
      if (result?.id) return setBookmarkingLoading(false);
    } else {
      //
    }
  };

  const onBookmarkDelete = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));
    if (!userBookmarked) return;

    setIsBookmarkDeletePending(true);
    await dispatch(bookmarkDelete(bookmarkId));
    setIsBookmarkDeletePending(false);
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
      onBookmarkGrab={onBookmarkGrab}
      onBookmarkDelete={onBookmarkDelete}
      isBookmarkDeletePending={isBookmarkDeletePending}
      createdAtFormatted={createdAtFormatted}
      userBookmarked={userBookmarked}
      bookmarkingLoading={bookmarkingLoading}
    />
  );
};

export default LinkRow;
