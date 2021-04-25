import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { NotificationDot, NotificationDotSize, NotificationDotType } from '.';

export default {
  component: NotificationDot,
  title: 'NotificationDot',
  decorators: [withKnobs],
};

const knobs = {
  size: (): NotificationDotSize => select('Size', ['small', 'normal', 'big', undefined], 'small'),
  type: (): NotificationDotType => select('NotificationDot', ['success', 'alert', 'error', undefined], 'error'),
};

export const Default: React.FC = () => <NotificationDot type={knobs.type()} size={knobs.size()} />;
