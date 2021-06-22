import React from 'react';

import { EditCircle, PlusCircleWithBackground, SpinnerCircularBrute } from 'Vendor/components';

import './ListFollowButton.less';

interface Props {
  className?: string;
  sessionUserOwnsList: boolean;
  sessionUserFollowsList: boolean;
  loading: boolean;
  recentlyChanged: boolean;
  onEdit: () => void;
  onMouseOut: () => void;
  onUnfollowList: () => void;
  onFollowList: () => void;
}

export const ListFollowButton: React.FC<Props> = ({
  className,
  loading,
  recentlyChanged,
  sessionUserOwnsList,
  sessionUserFollowsList,
  onEdit,
  onMouseOut,
  onUnfollowList,
  onFollowList,
}) => (
  <div className={'ListFollowButton' + (className ? ' ' + className : '')} onMouseOut={onMouseOut}>
    {!sessionUserOwnsList && !loading && sessionUserFollowsList && (
      <PlusCircleWithBackground
        className={
          'ListFollowButton-listFollowed ' + (recentlyChanged ? ' ListFollowButton-listFollowed--recentlyChanged' : '')
        }
        onClick={onUnfollowList}
        onMouseOut={onMouseOut}
      />
    )}
    {!sessionUserOwnsList && !loading && !sessionUserFollowsList && (
      <PlusCircleWithBackground
        className={
          'ListFollowButton-listNotFollowed' +
          (recentlyChanged ? ' ListFollowButton-listNotFollowed--recentlyChanged' : '')
        }
        onClick={onFollowList}
        onMouseOut={onMouseOut}
      />
    )}
    {sessionUserOwnsList && !loading && <EditCircle className="ListFollowButton-listEdit" onClick={onEdit} />}
    {loading && <SpinnerCircularBrute className="ListFollowButton-loader" />}
  </div>
);

export default ListFollowButton;
