import React from 'react';

import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  BookmarkFilled,
  BookmarkWithBackground,
  Check,
  Circle,
  Cross,
  Edit,
  EditCircle,
  IconSize,
  List,
  Loupe,
  PlusCircle,
  Private,
  Sort,
  Square,
  Triangle,
  User,
  UserAdd,
  UserAdmin,
  UserRemove,
} from '.';

export default {
  component: Triangle,
  title: 'Svg',
  decorators: [withKnobs],
};

const knobs = {
  name: (): string => select('Name', ['square', 'triangle', 'circle'], 'circle'),
  size: (): IconSize =>
    select('Size', ['nano', 'micro', 'small', 'normal', 'medium', 'big', 'biggest', 'huge', undefined], 'big'),
  filled: (): boolean => boolean('filled', false),
};

export const Icons: React.FC = () => (
  <>
    <H1>Svg Icons</H1>
    <Hr spacer />
    <Hr size="nano" />
    <Hr spacer size="big" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        minHeight: '80px',
        gridGap: '20px',
        width: '200px',
        margin: '0 auto',
      }}
    >
      <Triangle size={knobs.size()} filled={knobs.filled()} />
      <Square size={knobs.size()} filled={knobs.filled()} />
      <Circle size={knobs.size()} filled={knobs.filled()} />
      <Cross size={knobs.size()} filled={knobs.filled()} />
      <ArrowRight size={knobs.size()} filled={knobs.filled()} />
      <ArrowDown size={knobs.size()} filled={knobs.filled()} />
      <ArrowLeft size={knobs.size()} filled={knobs.filled()} />
      <ArrowUp size={knobs.size()} filled={knobs.filled()} />
      <Check size={knobs.size()} filled={knobs.filled()} />
      <Loupe size={knobs.size()} filled={knobs.filled()} />
      <User size={knobs.size()} filled={knobs.filled()} />
      <UserAdmin size={knobs.size()} filled={knobs.filled()} />
      <UserAdd size={knobs.size()} filled={knobs.filled()} />
      <UserRemove size={knobs.size()} filled={knobs.filled()} />
      <User size={knobs.size()} filled={knobs.filled()} />
      <Private size={knobs.size()} filled={knobs.filled()} />
      <Bookmark size={knobs.size()} filled={knobs.filled()} />
      <BookmarkFilled size={knobs.size()} filled={knobs.filled()} />
      <BookmarkWithBackground size={knobs.size()} filled={knobs.filled()} />
      <Edit size={knobs.size()} filled={knobs.filled()} />
      <EditCircle size={knobs.size()} filled={knobs.filled()} />
      <PlusCircle size={knobs.size()} filled={knobs.filled()} />
      <Sort size={knobs.size()} filled={knobs.filled()} />
      <List size={knobs.size()} filled={knobs.filled()} />
    </div>
  </>
);
