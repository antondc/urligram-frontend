import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { FAQ as FAQUi } from './FAQ';
import FAQJson from './FAQ.json';

const FAQ: React.FC = () => {
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  return <FAQUi data={FAQJson.data} currentSlug={currentSlug} />;
};

export default FAQ;
