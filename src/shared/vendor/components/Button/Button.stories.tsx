import React from 'react';

import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { Hr } from '../Hr';
import { Button } from '.';

export default {
  component: Button,
  title: 'Button',
  decorators: [withKnobs],
};

const knobs = {
  text: (): string => text('Button', 'Click me!'),
  grow: (): boolean => boolean('Grow', false),
  disabled: (): boolean => boolean('Disabled', false),
  success: (): boolean => boolean('Success', false),
  error: (): boolean => boolean('Error', false),
  loading: (): boolean => boolean('Loading', false),
  variant: (): 'alternate' | 'delete' => select('Variant', [undefined, 'alternate', 'delete'], undefined),
};

export const Default: React.FC = () => (
  <div style={{ width: '200px' }}>
    <Button
      text={knobs.text()}
      grow={knobs.grow()}
      disabled={knobs.disabled()}
      error={knobs.error()}
      success={knobs.success()}
      variant={knobs.variant()}
      loading={knobs.loading()}
    />
    <Hr spacer />
    <Button
      text={knobs.text()}
      grow={knobs.grow()}
      disabled={knobs.disabled()}
      error={knobs.error()}
      success={knobs.success()}
      variant={knobs.variant()}
      loading={knobs.loading()}
      icon="ArrowRight"
    />
    <Hr spacer />
    <Button
      text={knobs.text()}
      grow={knobs.grow()}
      disabled={knobs.disabled()}
      error={knobs.error()}
      success={knobs.success()}
      variant={knobs.variant()}
      loading={knobs.loading()}
    />
  </div>
);
