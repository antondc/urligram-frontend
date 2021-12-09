import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { Disclaimer as DisclaimerUi } from './Disclaimer';
import DisclaimerJson from './Disclaimer.json';

const Disclaimer: React.FC = () => {
  const currentSlug = useSelector(selectCurrentLanguageSlug);
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <DisclaimerUi data={DisclaimerJson.data} currentSlug={currentSlug} />;
};

export default Disclaimer;
