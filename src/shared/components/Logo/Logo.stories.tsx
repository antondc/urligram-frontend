import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import Logo from '.';

export default {
  component: Logo,
  title: 'Logo',
  decorators: [withKnobs],
};

const knobs = {
  loadingColors: (): boolean => boolean('Loading colors', false),
  loadingBeat: (): boolean => boolean('Loading heart beat', false),
};

export const Default: React.FC = () => (
  <ProviderWrapper>
    <Logo loadingColors={knobs.loadingColors()} loadingBeat={knobs.loadingBeat()} />
  </ProviderWrapper>
);
