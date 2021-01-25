import React, { useEffect, useState } from 'react';

import { Border, FadeInOut, H4, Hr } from '@antoniodcorrea/components';

import './SidebarBlock.less';

interface Props {
  title: string;
  loading: boolean;
}

const SidebarBlock: React.FC<Props> = ({ title, loading, children }) => {
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading]);

  const computedLoadingState = loading || loadingState;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child))
      return React.cloneElement(child, {
        loading: computedLoadingState,
      });
  });

  return (
    <Border grow>
      <H4>{title}</H4>
      <Hr spacer size="small" />
      <FadeInOut valueToUpdate={computedLoadingState} appear>
        <dl className="SidebarListLists-lists">{childrenWithProps}</dl>
      </FadeInOut>
    </Border>
  );
};

export default SidebarBlock;
