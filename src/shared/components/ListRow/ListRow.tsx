import React from 'react';

import Folder from 'Assets/svg/folder.svg';
import A from 'Components/A';
import { CustomTag } from 'Components/CustomTag';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { Earth, FadeInOut, Spinner } from '@antoniodcorrea/components';

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
      <Folder className="ListRow-titleIcon" />
      <A className="ListRow-titleLink" href={`/lists/${id}`} frontend styled={false}>
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
          <CustomTag>{item.name}</CustomTag>
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
