import React from 'react';

import A from 'Components/A';
import { AnimateHeight, Button, Frame, Hr, Space, Span } from 'Vendor/components';

import './CookiesBanner.less';

interface Props {
  accepted: boolean;
  show: boolean;
  onAccept: () => void;
}

export const CookiesBanner: React.FC<Props> = ({ onAccept, accepted, show }) => (
  <AnimateHeight mounted={show} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
    <Frame className={'CookiesBanner' + (accepted ? ' CookiesBanner--accepted' : '')} borderTop={false} padding="none">
      <div className="CookiesBanner-text">
        <Span className="CookiesBanner-textSpan CookiesBanner-textSpanTitle" bold size="medium">
          We use cookies
        </Span>
        <Hr spacer size="zero" />
        <Span className="CookiesBanner-textSpan CookiesBanner-textSpanBody" size="small">
          We use cookies to improve the user experience of this site. We have all the info at
          <Space />
          <A href="/policy" frontend underlined>
            <Span bold size="small">
              the policy page
            </Span>
          </A>
          .
        </Span>
      </div>
      <div className="CookiesBanner-buttons">
        <Button
          className="CookiesBanner-accept"
          text="Accept"
          variant="alternate"
          onClick={onAccept}
          size="small"
          success={accepted}
        />
      </div>
    </Frame>
  </AnimateHeight>
);
