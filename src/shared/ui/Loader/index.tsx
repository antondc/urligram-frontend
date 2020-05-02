import React from 'react';
import './Loader.less';

interface Props {
  loaded?: string | number;
  className?: string;
  error?: boolean;
  grow?: boolean;
}

const Loader: React.FC<Props> = ({ loaded, className, error, grow }) => {
  return (
    <div
      className={
        'Loader' + (error ? ' Loader--error' : '') + (className ? ' ' + className : '') + (grow ? ' Loader--grow' : '')
      }
    >
      <div className="Loader-loaded" style={{ width: loaded + '%' }} />
    </div>
  );
};

export default Loader;
