import React from 'react';

import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Routes } from 'Router/routes';
import { AnimateHeight, Button, Space } from '@antoniodcorrea/components';

import './CookiesBanner.less';

interface Props {
  glossary: GlossaryState;
  accepted: boolean;
  show: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export const CookiesBanner: React.FC<Props> = ({ glossary, onAccept, onReject, accepted, show }) => (
  <AnimateHeight mounted={show} speed="fastest" ease={[1, 0.02, 0.83, 1.15]}>
    <div className={'CookiesBanner' + (accepted ? ' CookiesBanner--accepted' : '')}>
      <div className="CookiesBanner-text">
        <div className="CookiesBanner-textSpan CookiesBanner-textSpanTitle">Cookies 🍪</div>
        <span className="CookiesBanner-textSpan CookiesBanner-textSpanBody">
          {glossary.weUseACookie}.
          <br />
          {glossary.weDoNotShareIt}.
          <br />
          {glossary.youCanFindAllTheInfoAt}
          <Space />
          <A href={`${Routes.Docs.route}#privacy-policy`} frontend underlined>
            <span>{glossary.thePolicyPage}</span>
          </A>
          .
        </span>
      </div>
      <div className="CookiesBanner-buttons">
        <Button text={glossary.accept} size="tiny" onClick={onAccept} success={accepted} />
        <Button text={glossary.reject} size="tiny" type="reset" onClick={onReject} />
      </div>
    </div>
  </AnimateHeight>
);
