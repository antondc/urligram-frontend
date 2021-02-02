import React from 'react';

import { A, Span } from '@antoniodcorrea/components';

import './LanguageItem.less';

interface Props {
  lang: string;
  href: string;
  isCurrent?: boolean;
  onClick: () => void;
}

const LanguageItem: React.FC<Props> = ({ lang, href, isCurrent, onClick }) => (
  <A
    className={'LanguageItem' + (isCurrent ? ' LanguageItem--active' : '')}
    href={href}
    styled={false}
    frontend
    disabled={isCurrent}
    onClick={onClick}
  >
    <Span bold className="LanguageItem-text">
      {lang}
    </Span>
  </A>
);

export default LanguageItem;
