import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Span from 'Ui/Span';
import User from 'Assets/svg/user.svg';
import { switchUserModal } from 'Modules/Ui/actions/switchUserModal';
import { switchMessageModal } from 'Modules/Ui/actions/switchMessageModal';
import Cross from 'Assets/svg/cross.svg';
import Hr from 'Ui/Hr';
import Border from 'Ui/Border';

import './UserModal.less';

interface Props {
  switchMessageModal: () => void;
  switchUserModal: () => void;
}

const UserModal: React.FC<Props> = ({ switchUserModal, switchMessageModal }) => {
  return (
    <Border className="UserModal">
      <Cross className="UserModal-cross" onClick={switchUserModal} />
      <User className="UserModal-userLogo" onClick={switchMessageModal} />
      <ul>
        <li>
          <Span bold>My account</Span>
          <Hr type="spacer" size="small" />
        </li>
        <li>
          <Span bold>My tags</Span>
          <Hr type="spacer" size="small" />
        </li>
        <li>
          <Span bold>Followers</Span>
          <Hr type="spacer" size="small" />
        </li>
        <li>
          <Span bold>Following</Span>
          <Hr type="spacer" size="small" />
        </li>
        <li>
          <Span bold>Recommended</Span>
          <Hr type="spacer" size="small" />
        </li>
        <li>
          <Span bold>My lists</Span>
        </li>
      </ul>
    </Border>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  switchUserModal,
  switchMessageModal,
})(UserModal);
