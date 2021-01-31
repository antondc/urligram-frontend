import React, { useEffect, useState } from 'react';

import { A, Border, FadeInOut, H4, Hr } from '@antoniodcorrea/components';

import './SidebarBlock.less';

interface Props {
  title: string;
  href?: string;
  loading: boolean;
}

const SidebarBlock: React.FC<Props> = ({ title, href, loading, children }) => {
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
      {!!href ? (
        <A href={href} styled={!!href}>
          <H4>{title}</H4>
        </A>
      ) : (
        <H4>{title}</H4>
      )}
      <Hr spacer size="small" />
      <FadeInOut valueToUpdate={computedLoadingState} appear>
        {childrenWithProps}
      </FadeInOut>
    </Border>
  );
};

export default SidebarBlock;
