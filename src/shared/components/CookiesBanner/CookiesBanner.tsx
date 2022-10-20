import React from 'react';

import A from 'Components/A';
import { AnimateHeight, Button, Space } from '@antoniodcorrea/components';

import './CookiesBanner.less';

interface Props {
  accepted: boolean;
  show: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export const CookiesBanner: React.FC<Props> = ({ onAccept, onReject, accepted, show }) => (
  <AnimateHeight mounted={show} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
    <div className={'CookiesBanner' + (accepted ? ' CookiesBanner--accepted' : '')}>
      <div className="CookiesBanner-text">
        <div className="CookiesBanner-textSpan CookiesBanner-textSpanTitle">Cookies 🍪</div>
        <span className="CookiesBanner-textSpan CookiesBanner-textSpanBody">
          We use a cookie to handle your login.
          <br />
          We do not share it with anyone, or use any other cookie from third parties.
          <br />
          You can find all the info at
          <Space />
          <A href="/policy" frontend underlined>
            <span>the policy page</span>
          </A>
          .
        </span>
      </div>
      <div className="CookiesBanner-buttons">
        <Button text="Accept" size="tiny" onClick={onAccept} success={accepted} />
        <Button text="Reject" size="tiny" type="reset" onClick={onReject} />
      </div>
    </div>
  </AnimateHeight>
);
