import React from 'react';

import List from 'Assets/svg/list.svg';
import A from 'Components/A';
import { TagNew } from 'Components/TagNew';
import { ListState } from 'Modules/Lists/lists.types';
import { SessionState } from 'Modules/Session/session.types';
import { Earth, FadeInOut, Spinner } from '@antoniodcorrea/components';

import './ListRowNew.less';

interface Props extends Partial<ListState> {
  session?: SessionState;
  currentPathname?: string;
  renderIsPublic: boolean;
  publicLoading: boolean;
  onPublicClick: () => void;
}

export const ListRowNew: React.FC<Props> = ({
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
  <div className="ListRowNew" data-test-id="ListRowNew" key={id}>
    <div className="ListRowNew-title">
      <List className="ListRowNew-titleIcon" />
      <A href={`/lists/${id}`} frontend styled={false}>
        {name}
      </A>
    </div>
    <div className="ListRowNew-description">{description}</div>
    <div className="ListRowNew-tags">
      {tags?.map((item) => (
        <A
          className="ListRowNew-tag"
          href={`${currentPathname}?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <TagNew>{item.name}</TagNew>
        </A>
      ))}
    </div>
    <div className="ListRowNew-icons">
      {renderIsPublic && (
        <FadeInOut valueToUpdate={publicLoading} appear speed="fast">
          {publicLoading ? (
            <Spinner className="ListRowNew-icon ListRowNew-iconPublicLoader" />
          ) : (
            <Earth
              className={'ListRowNew-icon' + (!!isPublic ? ' ListRowNew-icon--active' : '')}
              onClick={onPublicClick}
            />
          )}
        </FadeInOut>
      )}
    </div>
  </div>
);
