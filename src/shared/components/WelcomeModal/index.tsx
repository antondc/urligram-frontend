import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cross from 'Assets/svg/cross.svg';
import BaseModal from 'Components/BaseModal';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { switchWelcomeModal } from 'Modules/Ui/actions/switchWelcomeModal';
import { Border, Flex, H4, Hr, P, Span } from 'Vendor/components';

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
          <H4>Welcome @{name}!</H4>
          <Hr size="normal" spacer />
          <P>
            <Span size="normal" bold>
              Your account is active now
            </Span>
          </P>
          <Hr size="zero" spacer />
          <P>
            <Span size="normal" bold>
              🎉&nbsp;&nbsp;&nbsp;🥳
            </Span>
          </P>
        </Flex>
      </Border>
    </BaseModal>
  );
};

export default WelcomeModal;
