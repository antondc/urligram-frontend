import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Border, H3, Span, User, Fade, Cross, Hr } from '@antoniodcorrea/components';

import { switchUserModal } from '../../redux/modules/Ui/actions/switchUserModal';

import './UserModal.less';

interface Props {
  switchUserModal: () => void;
}

const UserModal: React.FC<Props> = ({ switchUserModal }) => {
  return (
    <Border className="UserModal">
      <Cross className="UserModal-cross" onClick={switchUserModal} />
      <User className="UserModal-userLogo" />

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
})(UserModal);
