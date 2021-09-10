import React from 'react';

import A from 'Components/A';
import { AnimateHeight, Button, Hr, Space, Span } from 'Vendor/components';

import './CookiesBanner.less';

interface Props {
  accepted: boolean;
  show: boolean;
  onAccept: () => void;
}

export const CookiesBanner: React.FC<Props> = ({ onAccept, accepted, show }) => (
  <AnimateHeight mounted={show} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
    <div className={'CookiesBanner' + (accepted ? ' CookiesBanner--accepted' : '')}>
      <div className="CookiesBanner-text">
        <Span className="CookiesBanner-textSpan CookiesBanner-textSpanTitle" weight="semiBold" size="medium">
          We use cookies
        </Span>
        <Hr spacer size="zero" />
        <Span className="CookiesBanner-textSpan CookiesBanner-textSpanBody" size="small">
          We use cookies to improve the user experience of this site. You can find all the info at
          <Space />
          <A href="/policy" frontend underlined>
            <Span weight="semiBold" size="small">
              the policy page
            </Span>
          </A>
          .
        </Span>
      </div>
      <div className="CookiesBanner-buttons">
        <Button className="CookiesBanner-accept" text="Accept" onClick={onAccept} success={accepted} />
      </div>
    </div>
  </AnimateHeight>
);
