import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { listUpdate } from 'Modules/Lists/actions/listUpdate';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { ListRow as ListRowUi } from './ListRow';

import './ListRow.less';

interface Props {
  id: number;
  list: ListState;
  sessionId: string;
  slug?: string;
}

const ListRow: React.FC<Props> = ({
  id,
  list: { userId, name, image, tags, bookmarksIds, description, members, isPrivate } = {},
}) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const session = useSelector(selectSession);

  const sessionUserOwnsList = userId === sessionId;

  const onEdit = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));
    if (!id) return;

    await dispatch(switchListModal({ mounted: true, listId: id }));
    // loadMainContent();
  };

  const onPrivateSwitch = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));
    if (!sessionUserOwnsList) return;

    const listData = {
      listId: id,
      listName: name,
      listDescription: description,
      listIsPrivate: !isPrivate,
    };
    const response = await dispatch(listUpdate(listData));

    if (!response.id) {
      return;
    }
  };

  return (
    <ListRowUi
      id={id}
      session={session}
      name={name}
      description={description}
      isPrivate={isPrivate}
      members={members}
      image={image}
      tags={tags}
      bookmarksIds={bookmarksIds}
      onEdit={onEdit}
      onPrivateSwitch={onPrivateSwitch}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  sessionId: selectSessionUserId,
  slug: selectCurrentLanguageSlug,
  list: selectListById,
});

export default connect(mapStateToProps, {})(ListRow);
