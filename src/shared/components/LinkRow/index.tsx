import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { linkLoadByIdRequest } from 'Modules/Links/actions/linkLoadByIdRequest';
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
  link: { linkId, title, url, tags = [], favicon, statistics, createdAt, users, loading },
  userId,
  isLogged,
  switchLoginModal,
  voteLink,
}) => {
  const dispatch = useDispatch();
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const date = new LocaleFormattedDate(createdAt, currentLanguageSlug);
  const formattedDate = date.getLocaleFormattedDate();
  const sessionId = useSelector(selectSessionUserId);
  const userBookmarked = users.includes(sessionId);
  const tagsByName = tags.map((item) => ({ tag: item.name }));

  const onVote = (vote) => {
    if (!isLogged) return switchLoginModal(true);

    voteLink({ vote, linkId: id, userId });
  };

  const onBookmark = () => {
    if (!userBookmarked) {
      dispatch(bookmarkCreate({ title, url, isPrivate: false, tags: tagsByName, linkId: id }));
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
      loading={loading}
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
