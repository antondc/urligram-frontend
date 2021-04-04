import React from 'react';

import { EditCircle, PlusCircleWithBackground, SpinnerLoader } from '@antoniodcorrea/components';

import './ListFollowButton.less';

interface Props {
  className?: string;
  id?: string;
  sessionUserOwnsList: boolean;
  sessionUserFollowsList: boolean;
  loading: boolean;
  image: string;
  recentlyChanged: boolean;
  onEdit: () => void;
  onMouseOut: () => void;
  onUnfollowList: () => void;
  onFollowList: () => void;
}

export const ListFollowButton: React.FC<Props> = ({
  className,
  id,
  image,
  loading,
  recentlyChanged,
  sessionUserOwnsList,
  sessionUserFollowsList,
  onEdit,
  onMouseOut,
  onUnfollowList,
  onFollowList,
}) => (
  <div id={id} className={'ListFollowButton' + (className ? ' ' + className : '')} onMouseOut={onMouseOut}>
    {sessionUserOwnsList && (
      <>
        <img className="ListFollowButton-userLogo" src={image} />
        <EditCircle className="ListFollowButton-listEdit" size="medium" onClick={onEdit} />
      </>
    )}
    {!sessionUserOwnsList && sessionUserFollowsList && (
      <PlusCircleWithBackground
        className={
          'ListFollowButton-listFollowed ' + (recentlyChanged ? ' ListFollowButton-listFollowed--recentlyChanged' : '')
        }
        size="medium"
        onClick={onUnfollowList}
      />
    )}
    {!sessionUserOwnsList && !sessionUserFollowsList && (
      <PlusCircleWithBackground
        className={
          'ListFollowButton-listNotFollowed' +
          (recentlyChanged ? ' ListFollowButton-listNotFollowed--recentlyChanged' : '')
        }
        size="medium"
        onClick={onFollowList}
      />
    )}
    {loading && <SpinnerLoader className="ListFollowButton-loader" size="nano" />}
  </div>
);

export default ListFollowButton;
