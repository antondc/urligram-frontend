import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Span from 'Ui/Span';
import User from 'Assets/svg/user.svg';
import { switchUserModal } from 'Modules/Ui/actions/switchUserModal';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import { logOut } from 'Modules/Session/actions/logOut';
import Cross from 'Assets/svg/cross.svg';
import Hr from 'Ui/Hr';
import A from 'Ui/A';
import Border from 'Ui/Border';

import './UserModal.less';

interface Props {
  logOut: () => void;
  switchMessageModal: () => void;
  switchUserModal: () => void;
}

const UserModal: React.FC<Props> = ({ logOut, switchUserModal, switchMessageModal }) => {
  return (
    <Border className="UserModal" onClick={switchUserModal}>
      <Cross className="UserModal-cross" />
      <User className="UserModal-userLogo" onClick={switchMessageModal} />
      <ul>
        <li>
          <A href="">
            <Span bold>My account</Span>
          </A>
        </li>
        <Hr type="spacer" size="small" />
        <li>
          <A href="">
            <Span bold>My tags</Span>
          </A>
        </li>
        <Hr type="spacer" size="small" />
        <li>
          <A href="">
            <Span bold>Followers</Span>
          </A>
        </li>
        <Hr type="spacer" size="small" />
        <li>
          <A href="">
            <Span bold>Following</Span>
          </A>
        </li>
        <Hr type="spacer" size="small" />
        <li>
          <A href="">
            <Span bold>Recommended</Span>
          </A>
        </li>
        <Hr type="spacer" size="small" />
        <li>
          <A href="">
            <Span bold>My lists</Span>
          </A>
        </li>
        <Hr type="spacer" size="small" />
        <li className="UserModal-logOut" onClick={logOut}>
          <A href="">
            <Span bold>Log out</Span>
          </A>
        </li>
      </ul>
    </Border>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  switchUserModal,
  switchMessageModal,
  logOut,
})(UserModal);
