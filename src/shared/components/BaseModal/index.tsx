import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LayoutContent from 'Common/LayoutContent';
import { unMountAllModals } from 'Modules/Ui/actions/unMountAllModals';

import './BaseModal.less';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  unMountAllModals: () => void;
}

const BaseModal: React.FC<Props> = ({ children, unMountAllModals }) => (
  <div className="BaseModal">
    <LayoutContent className="BaseModal-center">
      <div className="BaseModal-background" onClick={unMountAllModals} />
      <div className="BaseModal-content">{children}</div>
    </LayoutContent>
  </div>
);

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
  unMountAllModals,
})(BaseModal);
