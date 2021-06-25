import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { Disclaimer as DisclaimerUi } from './Disclaimer';
import DisclaimerJson from './Disclaimer.json';

const Disclaimer: React.FC = () => {
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  return <DisclaimerUi data={DisclaimerJson.data} currentSlug={currentSlug} />;
};

export default Disclaimer;
