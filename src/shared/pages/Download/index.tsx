import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { Download as DownloadUi } from './Download';
import DownloadJson from './Download.json';

const Download: React.FC = () => {
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  return <DownloadUi data={DownloadJson.data} currentSlug={currentSlug} />;
};

export default Download;
