import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LayoutContent from 'Common/LayoutContent';
import BookmarkForm from 'Components/BookmarkForm';
import LoginForm from 'Components/LoginForm';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { SESSION_LOG_IN_SUCCESS } from 'Modules/Session/session.types';
import { USER_RESET } from 'Root/src/shared/constants';
import { SessionDataStorage } from 'Services/SessionDataStorage';
import { Border, Cross, Flex, Hr, User } from 'Vendor/components';

import './Layout.less';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const sessionDataStorage = new SessionDataStorage();
  const logOut = async () => {
    await sessionDataStorage.remove('Session');

    await dispatch({
      type: SESSION_LOG_IN_SUCCESS,
      payload: USER_RESET,
    });
  };

  useEffect(() => {
    document.body.classList.remove('preload'); // Preventing animations on load
    document.body.classList.add('isLoaded'); // Showing page on load
  }, []);

  useEffect(() => {
    const asyncFunction = async () => {
      const sessionData = await sessionDataStorage.get('Session');
      const authed = sessionData?.id;
      if (!authed) return;

      await dispatch({
        type: SESSION_LOG_IN_SUCCESS,
        payload: {
          ...sessionData,
        },
      });
    };
    asyncFunction();
  }, []);

  return (
    <LayoutContent>
      <Border>
        <Flex horizontal="between" growHorizontal vertical="top">
          {session?.id ? (
            <div className="Layout-close" onClick={logOut}>
              <Cross size="small" />
            </div>
          ) : (
            <div />
          )}
          {session?.id ? (
            <img className="Layout-image" src={session?.image?.w200h200} />
          ) : (
            <User name="User" className="Layout-userLogo" />
          )}
        </Flex>
        <Hr spacer />
        <Hr size="micro" />
        <Hr spacer />
        {!!session?.id ? <BookmarkForm /> : <LoginForm />}
        <Hr spacer />
      </Border>
    </LayoutContent>
  );
};

export default Layout;
