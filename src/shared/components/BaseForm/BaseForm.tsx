import React, { HTMLProps } from 'react';

import './BaseForm.less';

interface Props extends HTMLProps<HTMLFormElement> {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const BaseForm: React.FC<Props> = ({ children, className, ...props }) => (
  <form className={'BaseForm' + (className ? ' ' + className : '')} {...props}>
    {children}
  </form>
);

export default BaseForm;
