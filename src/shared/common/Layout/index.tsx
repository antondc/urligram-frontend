import React, { useEffect } from 'react';

import LayoutContent from 'Common/LayoutContent';

import './Layout.less';

const Layout: React.FC = () => {
  useEffect(() => {
    document.body.classList.remove('preload'); // Preventing animations on load
    document.body.classList.add('isLoaded'); // Showing page on load
  }, []);

  return (
    <div>
      <LayoutContent>This is a test component</LayoutContent>
    </div>
  );
};

export default Layout;
