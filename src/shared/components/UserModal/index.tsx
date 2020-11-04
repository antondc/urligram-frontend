import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Cross from 'Assets/svg/cross.svg';
import User from 'Assets/svg/user.svg';
import { logOut } from 'Modules/Session/actions/logOut';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import { switchUserModal } from 'Modules/Ui/actions/switchUserModal';
import Border from 'Ui/Border';
import Hr from 'Ui/Hr';
import Span from 'Ui/Span';
import { A } from '@antoniodcorrea/components';

import './UserModal.less';

interface Props {
  logOut: () => void;
  switchMessageModal: () => void;
  switchUserModal: () => void;
}

const UserModal: React.FC<Props> = ({ logOut, switchUserModal, switchMessageModal }) => (
  <Border className="UserModal" onClick={switchUserModal} onMouseLeave={switchUserModal}>
    <Cross className="UserModal-cross" />
    <User className="UserModal-userLogo" onClick={switchMessageModal} />
    <ul>
      <li>
        <A href="" frontend>
          <Span bold>My account</Span>
        </A>
      </li>
      <Hr type="spacer" size="small" />
      <li>
        <A href="" frontend>
          <Span bold>My tags</Span>
        </A>
      </li>
      <Hr type="spacer" size="small" />
      <li>
        <A href="" frontend>
          <Span bold>Followers</Span>
        </A>
      </li>
      <Hr type="spacer" size="small" />
      <li>
        <A href="" frontend>
          <Span bold>Following</Span>
        </A>
      </li>
      <Hr type="spacer" size="small" />
      <li>
        <A href="" frontend>
          <Span bold>Recommended</Span>
        </A>
      </li>
      <Hr type="spacer" size="small" />
      <li>
        <A href="" frontend>
          <Span bold>My lists</Span>
        </A>
      </li>
      <Hr type="spacer" size="small" />
      <li className="UserModal-logOut" onClick={logOut}>
        <Span bold>Log out</Span>
      </li>
    </ul>
  </Border>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  switchUserModal,
  switchMessageModal,
  logOut,
})(UserModal);
