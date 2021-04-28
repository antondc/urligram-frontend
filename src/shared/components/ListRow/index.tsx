import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { switchListModal } from 'Modules/Ui/actions/switchListModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { DELAY_THREE_SEC } from '../../constants';
import { listFollow } from '../../redux/modules/Lists/actions/listFollow';
import { listUnfollow } from '../../redux/modules/Lists/actions/listUnfollow';
import { selectListLoading } from '../../redux/modules/Lists/selectors/selectListLoading';
import { RootState } from '../../redux/modules/rootType';
import { ListRow as ListRowUi } from './ListRow';

import './ListRow.less';

interface Props {
  id: number;
}

const ListRow: React.FC<Props> = ({ id }) => {
  const session = useSelector(selectSession);
  const { name, image, tags, bookmarksIds, description, members, isPrivate } = useSelector((state: RootState) =>
    selectListById(state, { id })
  );

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
    />
  );
};

export default ListRow;
