import React, { useEffect, useState } from 'react';

import { SpinnerIcon } from './SpinnerIcon';

import './SpinnerCircularBrute.less';

export type SpinnerCircularBruteSize = 'nano' | 'micro' | 'small' | 'normal' | 'medium' | 'big' | 'biggest' | 'huge';

interface Props {
  className?: string;
  size?: SpinnerCircularBruteSize;
  speed?: 'slow' | 'normal' | 'fast' | 'fastest';
}

export const SpinnerCircularBrute: React.FC<Props> = ({ className, size = 'normal', speed = 'fast' }) => {
  const [index, setIndex] = useState<number>(2);

  const speedMap = {
    slow: 500,
    normal: 225,
    fast: 175,
    fastest: 100,
  };
  const updateIndex = (oldIndex) => {
    const newIndex = oldIndex + 1;
    if (newIndex > 8) return 1;

    return newIndex;
  };

  useEffect(() => {
    setInterval(() => setIndex(updateIndex), speedMap[speed]);
  }, []);

  return (
    <SpinnerIcon
      step={index}
      className={
        'SpinnerCircularBrute ' + (className ? ' ' + className : '') + (size ? ' SpinnerCircularBrute--' + size : '')
      }
    />
  );
};
