import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlossaryState } from 'Modules/Languages/languages.types';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { ListState } from 'Modules/Lists/lists.types';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { selectListsById } from '../../redux/modules/Lists/selectors/selectListById';
import { ListRow as ListRowUi } from './ListRow';

import './ListRow.less';

interface Props {
  id: number;
  list: ListState;
  sessionId: string;
  slug?: string;
  currentGlossary?: GlossaryState;
}

const ListRow: React.FC<Props> = ({
  id,
  list: { name, image, tags, createdAt, updatedAt, bookmarksIds } = {},
  slug,
  currentGlossary: { since },
}) => {
  const date = new LocaleFormattedDate(createdAt, slug);
  const formattedDate = date.getLocaleFormattedDate();

  return (
    <ListRowUi
      id={id}
      name={name}
      createdAt={formattedDate}
      updatedAt={updatedAt}
      sinceTranslation={since}
      members={[]}
      image={image}
      tags={tags}
      bookmarksIds={bookmarksIds}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  sessionId: selectSessionUserId,
  currentGlossary: selectCurrentGlossary,
  slug: selectCurrentLanguageSlug,
  list: selectListsById,
});

export default connect(mapStateToProps, {})(ListRow);
