import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import throttle from 'lodash/throttle';

import { selectUiSidebarleftState } from 'Modules/Ui/selectors/selectUiSidebarleftState';
import { DELAY_MEDIUM_MS } from 'Root/src/shared/constants';
import history from 'Services/History';
import { listItems } from './listItems';
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

  // Throttle this function to avoid overhead on window
  const onScroll = throttle(() => {
    // Find all sidebar hashes
    const allHashes = listItems.map((item) => [item.hash].concat(item.subItems?.map((item) => item.hash))).flat();

    const screenHeight = window.screen.height;

    const hashesInViewport = allHashes.filter((item) => {
      const element = window.document.getElementById(item);
      const rect = element.getBoundingClientRect();
      const isOutAboveScreen = rect.bottom < 0; // Item bottom is above top of the screen
      const isOutBelowScreen = rect.top > screenHeight; // Item top is greater than screen height, is out
      const isIn = !isOutAboveScreen && !isOutBelowScreen; // Item is displayed screen
      const isAboveScreenThreshold = rect.top < screenHeight / 10; // Item top distance to top border is above a portion of screen height
      const isInAndisAboveScreenThreshold = isIn && isAboveScreenThreshold;

      return isInAndisAboveScreenThreshold;
    });

    // We only take action on the last of the rendered items
    const lastHash = hashesInViewport[hashesInViewport.length - 1];

    setHash(lastHash);
    history.push(`/docs#${lastHash}`);
  }, DELAY_MEDIUM_MS);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const cleanedHash = window.location?.hash?.replace('#', '');
    setHash(cleanedHash);

    if (!hash) return;

    navigateToSection(cleanedHash);
  }, []);

  return (
    <SidebarLeftDocsUi
      hash={hash}
      sidebarLeftClosed={sidebarLeftClosed}
      onAnchorClick={onAnchorClick}
      listItems={listItems}
    />
  );
};

export default SidebarLeftDocs;
