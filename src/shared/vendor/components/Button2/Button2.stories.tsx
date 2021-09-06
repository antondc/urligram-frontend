import React from 'react';

import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { Hr } from '../Hr';
import { Button2 } from '.';

export default {
  component: Button2,
  title: 'Button2',
  decorators: [withKnobs],
};

export const Default: React.FC = () => (
  <>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow />
    </div>
    <Hr spacer size="big" />
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow success />
    </div>
    <Hr spacer size="big" />
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow disabled />
    </div>
    <Hr spacer size="big" />
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow error />
    </div>
    <Hr spacer size="big" />
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow loading />
    </div>
    <Hr spacer size="big" />
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow arrow />
    </div>
  </>
);
