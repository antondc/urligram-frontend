import React from 'react';
import A from '../../ui/A';
import Span from '../../ui/Span';

import './LanguageItem.less';

interface Props {
  lang: string;
  href?: string;
  isCurrent?: boolean;
  onClick: () => void;
}

const LanguageItem: React.FC<Props> = ({ lang, href, isCurrent, onClick }) => {
  return (
    <A
      className={'LanguageItem' + (isCurrent ? ' LanguageItem--active' : '')}
      href={href}
      styled={false}
      frontend
      onClick={onClick}
    >
      <Span bold className="LanguageItem-text">
        {lang}
      </Span>
    </A>
  );
};

export default LanguageItem;
