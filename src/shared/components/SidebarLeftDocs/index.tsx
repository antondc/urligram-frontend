import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUiSidebarleftState } from 'Modules/Ui/selectors/selectUiSidebarleftState';
import { SidebarLeftDocs as SidebarLeftDocsUi } from './SidebarLeftDocs';

const SidebarLeftDocs: React.FC = () => {
  const [hash, setHash] = useState<string>(undefined);

  const sidebarLeftClosed = useSelector(selectUiSidebarleftState);

  const navigateToSection = (hash: string) => {
    const element = document.getElementById(hash);

    if (!element) return;

    const yOffset = -90;
    const yDistance = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: yDistance, behavior: 'smooth' });
  };

  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    navigateToSection(hash);
  };

  useEffect(() => {
    const hash = window.location?.hash;
    if (!hash) return;

    const cleanedHash = hash?.replace('#', '');

    setHash(cleanedHash);
    navigateToSection(cleanedHash);
  });

  return <SidebarLeftDocsUi hash={hash} sidebarLeftClosed={sidebarLeftClosed} onAnchorClick={onAnchorClick} />;
};

export default SidebarLeftDocs;
