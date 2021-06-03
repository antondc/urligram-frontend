import React, { useEffect, useState } from 'react';

import './SpinnerCircularBrute.less';

export type SpinnerCircularBruteSize = 'nano' | 'micro' | 'small' | 'normal' | 'medium' | 'big' | 'biggest' | 'huge';

interface Props {
  className?: string;
  size?: SpinnerCircularBruteSize;
}

export const SpinnerCircularBrute: React.FC<Props> = ({ className, size = 'normal' }) => {
  const [index, setIndex] = useState<number>(0);
  const items = ['○', '◔', '◑', '◕', '●'];

  const updateIndex = (oldIndex) => {
    const newIndex = oldIndex + 1;
    if (newIndex >= items.length) return 0;

    return newIndex;
  };

  useEffect(() => {
    setInterval(() => setIndex(updateIndex), 150);
  }, []);

  return (
    <span
      className={
        'SpinnerCircularBrute' + (className ? ' ' + className : '') + (size ? ' SpinnerCircularBrute--' + size : '')
      }
    >
      {items[index]}
    </span>
  );
};
