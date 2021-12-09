import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { FAQ as FAQUi } from './FAQ';
import FAQJson from './FAQ.json';

const FAQ: React.FC = () => {
  const dispatch = useDispatch();
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <FAQUi data={FAQJson.data} currentSlug={currentSlug} />;
};

export default FAQ;
