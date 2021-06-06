import React from 'react';

import Spinner1 from 'Assets/svg/spinner1.svg';
import Spinner2 from 'Assets/svg/spinner2.svg';
import Spinner3 from 'Assets/svg/spinner3.svg';
import Spinner4 from 'Assets/svg/spinner4.svg';
import Spinner5 from 'Assets/svg/spinner5.svg';
import Spinner6 from 'Assets/svg/spinner6.svg';
import Spinner7 from 'Assets/svg/spinner7.svg';
import Spinner8 from 'Assets/svg/spinner8.svg';

interface Props {
  className: string;
  step: number;
}

export const SpinnerIcon: React.FC<Props> = ({ step, className }) => {
  switch (true) {
    case step === 2:
      return <Spinner2 className={className} />;

    case step === 3:
      return <Spinner3 className={className} />;

    case step === 4:
      return <Spinner4 className={className} />;

    case step === 5:
      return <Spinner5 className={className} />;

    case step === 6:
      return <Spinner6 className={className} />;

    case step === 7:
      return <Spinner7 className={className} />;

    case step === 8:
      return <Spinner8 className={className} />;

    default:
      return <Spinner1 className={className} />;
  }
};
