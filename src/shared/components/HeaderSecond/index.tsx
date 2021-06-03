import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { HttpClient } from 'Services/HttpClient';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { HeaderSecond as HeaderSecondUi } from './HeaderSecond';

import './HeaderSecond.less';

const HeaderSecond: React.FC = () => {
  const [weatherString, setWheatherString] = useState<string>(undefined);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const dateNowMs = Math.floor(Date.now() / 1000);
  const date = new LocaleFormattedDate({ unixTime: dateNowMs, locale: currentLanguageSlug });
  const formattedDate = date.getLocaleFormattedDate();

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const httpClient = new HttpClient({ credentials: false });
        const weatherString: string = await httpClient.publicInstance.get(
          'https://wttr.in/?format=%l:+%c+•+%t+•+%m+•+%P+•+%w'
        );

        setWheatherString(`${weatherString}`);
      } catch (error) {
        console.log('HeaderSecond.useEffect.catch error: ', error);
      }
    };

    asyncFunction();
  }, []);

  return <HeaderSecondUi formattedDate={formattedDate} weatherString={weatherString} />;
};

export default HeaderSecond;
