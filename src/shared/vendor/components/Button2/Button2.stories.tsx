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
  <div style={{ display: 'grid', gap: '10px 10px', gridTemplateColumns: '1fr 1fr', alignItems: 'flex-end' }}>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow size="small" />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow success />
    </div>{' '}
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow success size="small" />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow disabled />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow disabled size="small" />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow error />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow error size="small" />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow loading />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow loading size="small" />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow arrow />
    </div>
    <div style={{ width: '200px', outline: '2px solid rgba(255, 0, 255, .0)' }}>
      <Button2 text="Click me!" grow arrow size="small" />
    </div>
  </div>
);
