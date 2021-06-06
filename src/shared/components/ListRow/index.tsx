import React from 'react';
import { useSelector } from 'react-redux';

import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
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
