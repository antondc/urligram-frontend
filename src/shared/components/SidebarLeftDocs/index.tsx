import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectUiSidebarleftState } from 'Modules/Ui/selectors/selectUiSidebarleftState';
import { SidebarLeftDocs as SidebarLeftDocsUi } from './SidebarLeftDocs';

const SidebarLeftDocs: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);
  const route = useSelector(selectCurrentRoute);

  const sidebarLeftClosed = useSelector(selectUiSidebarleftState);

  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (!element) return;

    const yOffset = -30;
    const yDistance = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: yDistance, behavior: 'smooth' });
  };

  return (
    <SidebarLeftDocsUi
      routeName={route?.name}
      glossary={glossary}
      sidebarLeftClosed={sidebarLeftClosed}
      onAnchorClick={onAnchorClick}
    />
  );
};

export default SidebarLeftDocs;
