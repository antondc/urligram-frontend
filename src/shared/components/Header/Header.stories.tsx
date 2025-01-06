import React, { useState } from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { noop } from '@antoniodcorrea/utils';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { defaultGlossaryState } from '../../redux/modules/Languages/languages.reducer';
import { Header } from './Header';

export default {
  component: Header,
  title: 'Header',
  decorators: [withKnobs],
};

const knobs = {
  searchOpen: (): boolean => boolean('Search open', false),
  loadingColors: (): boolean => boolean('Loading colors', false),
  loadingHeartBeat: (): boolean => boolean('Loading heart beat', false),
};

const props = {
  session: {},
  currentGlossary: defaultGlossaryState,
  searchFormOpen: false,
  logoLoadingHeartBeat: false,
  logoLoadingColors: false,
  sessionLoading: false,
  onUserClick: noop,
  switchUiBookmarkModal: noop,
  searchValue: '',
  onSearchInputChange: noop,
  onSearchCrossClick: noop,
  onSearchSubmit: noop,
  onSearchButtonClick: noop,
  setSearchFormOpen: noop,
  onSearchFormLeave: noop,
};

export const Default: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(undefined);

  const onSearchInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;

    setSearchValue(value);
  };

  return (
    <ProviderWrapper>
      <Header
        {...props}
        onSearchInputChange={onSearchInputChange}
        searchValue={searchValue}
        searchFormOpen={knobs.searchOpen()}
        logoLoadingColors={knobs.loadingColors()}
        logoLoadingHeartBeat={knobs.loadingHeartBeat()}
      />
    </ProviderWrapper>
  );
};
