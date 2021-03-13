import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchWelcomeModal } from 'Modules/Ui/actions/switchWelcomeModal';
import { Border, Flex, H3, Hr, P, Span } from '@antoniodcorrea/components';

import './WelcomeModal.less';

const WelcomeModal: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectSession);

  const closeWelcomeModal = () => {
    dispatch(switchWelcomeModal(false));
  };

  return (
    <BaseModal onClick={closeWelcomeModal}>
      <Border className="WelcomeModal" grow>
        <Cross className="WelcomeModal-cross" onClick={closeWelcomeModal} />
        <Flex horizontal="center">
          <H3>Welcome @{name}!</H3>
          <Hr size="big" spacer />
          <P>
            <Span size="normal" bold>
              Your account is active now :)
            </Span>
          </P>
        </Flex>
      </Border>
    </BaseModal>
  );
};

export default WelcomeModal;
