import React from 'react';

import { Palette } from '.';

export default {
  component: Palette,
  title: 'Palette',
};

const defaultProps = {};

export const Default: React.FC = () => <Palette {...defaultProps} />;
