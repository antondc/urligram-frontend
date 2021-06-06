import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { H1, Hr } from 'Vendor/components';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import Logo from './index';

export default {
  component: Logo,
  title: 'Logo',
  decorators: [withKnobs],
};

const knobs = {
  loadingBeat: (): boolean => boolean('Loading', false),
  loadingColors: (): boolean => boolean('Loading', false),
};

export const Default: React.FC = () => (
  <ProviderWrapper>
    <H1>Logo</H1>
    <Hr spacer />
    <Logo loadingBeat={knobs.loadingBeat()} loadingColors={knobs.loadingColors()} />
  </ProviderWrapper>
);
