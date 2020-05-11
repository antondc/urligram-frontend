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
    <li className={'LanguageItem' + (isCurrent ? ' LanguageItem--active' : '')} onClick={onClick}>
      <A href={href} styled={false} frontend>
        <Span bold className="LanguageItem-text">
          {lang}
        </Span>
      </A>
    </li>
  );
};

export default LanguageItem;
