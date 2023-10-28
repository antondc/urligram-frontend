import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listUpdate } from 'Modules/Lists/actions/listUpdate';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { ListRowNew as ListRowNewUi } from './ListRowNew';

import './ListRowNew.less';

interface Props {
  id: number;
}

const ListRowNew: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const [publicLoading, setPublicLoading] = useState<boolean>(false);
  const session = useSelector(selectSession);
  const { name, image, tags, bookmarksIds, description, members, isPublic, userId } = useSelector((state: RootState) =>
    selectListById(state, { id })
  );
  const currentPathname = useSelector(selectCurrentPathname);
  const sessionUserOwnsList = session?.id === userId;

  const onPublicClick = async () => {
    if (!sessionUserOwnsList) return;

    setPublicLoading(true);
    const isPublicReverted = !isPublic;

    try {
      const data = {
        listId: id,
        listName: name,
        listDescription: description,
        listIsPublic: isPublicReverted,
      };

      await dispatch(listUpdate(data));
    } finally {
      setPublicLoading(false);
    }
  };

  return (
    <ListRowNewUi
      id={id}
      session={session}
      name={name}
      description={description}
      isPublic={isPublic}
      members={members}
      image={image}
      tags={tags}
      currentPathname={currentPathname}
      bookmarksIds={bookmarksIds}
      renderIsPublic={sessionUserOwnsList}
      publicLoading={publicLoading}
      onPublicClick={onPublicClick}
    />
  );
};

export default ListRowNew;
