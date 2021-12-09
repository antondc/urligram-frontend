import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { Download as DownloadUi } from './Download';
import DownloadJson from './Download.json';

const Download: React.FC = () => {
  const dispatch = useDispatch();
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <DownloadUi data={DownloadJson.data} currentSlug={currentSlug} />;
};

export default Download;
