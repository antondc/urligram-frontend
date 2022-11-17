import React from 'react';

import List from 'Assets/svg/list.svg';
import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { Earth, FadeInOut, Spinner, Tag } from '@antoniodcorrea/components';

import './ListRow.less';

interface Props extends Partial<ListState> {
  session?: SessionState;
  currentPathname?: string;
  renderIsPublic: boolean;
  publicLoading: boolean;
  onPublicClick: () => void;
}

export const ListRow: React.FC<Props> = ({
  id,
  name,
  tags,
  description,
  isPublic,
  currentPathname,
  renderIsPublic,
  publicLoading,
  onPublicClick,
}) => (
  <div className="ListRow" data-test-id="ListRow" key={id}>
    <div className="ListRow-title">
      <A href={`/lists/${id}`} frontend styled={false}>
        <List className="ListRow-titleIcon" />
        {name}
      </A>
    </div>
    <div className="ListRow-description">{description}</div>
    <div className="ListRow-tags">
      {tags?.map((item) => (
        <A
          className="ListRow-tag"
          href={`${currentPathname}?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag>{item.name}</Tag>
        </A>
      ))}
    </div>
    <div className="ListRow-icons">
      {renderIsPublic && (
        <FadeInOut valueToUpdate={publicLoading} appear speed="fast">
          {publicLoading ? (
            <Spinner className="ListRow-icon ListRow-iconPublicLoader" />
          ) : (
            <Earth className={'ListRow-icon' + (!!isPublic ? ' ListRow-icon--active' : '')} onClick={onPublicClick} />
          )}
        </FadeInOut>
      )}
    </div>
  </div>
);
