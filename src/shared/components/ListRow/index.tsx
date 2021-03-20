import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListsById } from 'Modules/Lists/selectors/selectListById';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
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
  list: { name, image, tags, createdAt, updatedAt, bookmarksIds, description, membersIds } = {},
  slug,
}) => {
  const date = new LocaleFormattedDate(createdAt, slug);
  const formattedDate = date.getLocaleFormattedDate();

  return (
    <ListRowUi
      id={id}
      name={name}
      description={description}
      createdAt={formattedDate}
      updatedAt={updatedAt}
      membersIds={membersIds}
      image={image}
      tags={tags}
      bookmarksIds={bookmarksIds}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  sessionId: selectSessionUserId,
  slug: selectCurrentLanguageSlug,
  list: selectListsById,
});

export default connect(mapStateToProps, {})(ListRow);
