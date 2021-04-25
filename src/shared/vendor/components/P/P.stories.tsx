import React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { P } from '.';

export default {
  component: P,
  title: 'P',
  decorators: [withKnobs],
};

const knobs = {
  text1: (): string =>
    text(
      'Text1',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum aut tempore enim cum cupiditate nihil dolores quo aperiam sit id atque, vel eius? Ab doloribus dolore earum laboriosam incidunt eveniet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum aut tempore enim cum cupiditate nihil dolores quo aperiam sit id atque, vel eius? Ab doloribus dolore earum laboriosam incidunt eveniet'
    ),
  text2: (): string =>
    text(
      'Text2',
      'Nostrum aut tempore enim cum cupiditate nihil dolores quo aperiam sit id atque, vel eius? Ab doloribus dolore earum laboriosam incidunt eveniet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum aut tempore enim cum cupiditate nihil dolores quo aperiam sit id atque, vel eius? Ab doloribus dolore earum laboriosam incidunt eveniet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. '
    ),
};

export const Default: React.FC = () => (
  <>
    <P>{knobs.text1()}</P>
    <P>{knobs.text2()}</P>
  </>
);
