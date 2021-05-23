import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LayoutContent from 'Common/LayoutContent';
import BookmarkForm from 'Components/BookmarkForm';
import LoginForm from 'Components/LoginForm';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { SESSION_LOG_IN_SUCCESS } from 'Modules/Session/session.types';
import { BROWSER_CHROME, BROWSER_FIREFOX } from 'Root/src/shared/constants';
import { identifyBrowser } from 'Tools/utils/browser/identifyBrowser';
import { FadeInOut, Hr } from 'Vendor/components';

import './Layout.less';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const userAgent = identifyBrowser();
  const [authed, setAuthed] = useState<boolean>(null);
  const session = useSelector(selectSession);

  useEffect(() => {
    document.body.classList.remove('preload'); // Preventing animations on load
    document.body.classList.add('isLoaded'); // Showing page on load
  }, []);

  useEffect(() => {
    const asyncFunction = async () => {
      if (userAgent === BROWSER_CHROME) {
        chrome.storage.sync.get(['Session'], (result) => {
          if (result.Session) {
            setAuthed(true);
          } else {
            setAuthed(false);
          }
        });
      }
      if (userAgent === BROWSER_FIREFOX) {
        const storageRaw = await browser.storage.local.get('Session');
        const storageStringified = JSON.stringify(storageRaw);
        const storageParsed = JSON.parse(storageStringified);
        if (!storageParsed?.Session?.id) {
          setAuthed(false);

          return;
        }
        if (storageParsed?.Session?.id) {
          setAuthed(true);

          await dispatch({
            type: SESSION_LOG_IN_SUCCESS,
            payload: {
              ...storageParsed?.Session,
            },
          });
        }
      }
    };
    asyncFunction();
  }, [session]);

  if (authed === null) return <div />;

  return (
    <div>
      <LayoutContent>
        session: {session.id}
        <Hr size="micro" />
        <Hr spacer />
        <FadeInOut valueToUpdate={authed} appear>
          {authed ? <BookmarkForm /> : <LoginForm />}
        </FadeInOut>
      </LayoutContent>
    </div>
  );
};

export default Layout;
