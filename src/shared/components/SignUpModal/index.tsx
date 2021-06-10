import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchSignUpModal } from 'Modules/Ui/actions/switchSignUpModal';
import { Flex, Frame, H3, Hr, P, Span } from 'Vendor/components';

import './SignUpModal.less';

const SignUpModal: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectSession);

  const closeSignUpModal = () => {
    dispatch(switchSignUpModal(false));
  };

  return (
    <BaseModal onClick={closeSignUpModal}>
      <Frame className="SignUpModal" grow>
        <Cross className="SignUpModal-cross" onClick={closeSignUpModal} />
        <Flex horizontal="center">
          <H3>Thanks @{name}!</H3>
          <Hr size="big" spacer />
          <P>
            <Span size="normal" weight="semiBold">
              Your account has been created and is on stand by. Please check your email to activate it!
            </Span>
          </P>
          <P>
            <Span size="normal" weight="semiBold">
              ✉️&nbsp;&nbsp;&nbsp;🚀
            </Span>
          </P>
        </Flex>
      </Frame>
    </BaseModal>
  );
};

export default SignUpModal;
