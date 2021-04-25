import React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { H2 } from '../H2';
import { H3 } from '../H3';
import { H4 } from '../H4';
import { Hr } from '../Hr';
import { Span } from '../Span';

export default {
  title: 'Typography',
  decorators: [withKnobs],
};

const knobs = {
  H1: (): string => text('H1', 'H1 — Header: Arial 36.'),
  H2: (): string => text('H2', 'h2 — Header: Arial 30.'),
  H3: (): string => text('H3', 'H3 — Header: Arial 24.'),
  H4: (): string => text('H4', 'H4 — Header: Arial 20.'),
  SpanNormalBold: (): string => text('Span normal bold', 'p — normal text bold: Arial 16'),
  SpanNormalRegular: (): string => text('Span normal regular', 'p — normal text: Arial 16'),
  SpanSmallBold: (): string => text('Span small bold', 'p — small text bold: Arial 12'),
  SpanSmallRegular: (): string => text('Span small regular', 'p — small text: Arial 12'),
  SpanMicroBold: (): string => text('Span micro bold', 'p — micro text bold: Arial 10'),
  SpanMicroRegular: (): string => text('Span micro regular', 'p — micro text: Arial 10'),
  SpanNanoBold: (): string => text('Span nano bold', 'p — nano text bold: Arial 8'),
  SpanNanoRegular: (): string => text('Span nano regular', 'p — nano text: Arial 8'),
};

export const Default: React.FC = () => (
  <>
    <H1>{knobs.H1()}</H1>
    <Hr spacer size="micro" />
    <H2>{knobs.H2()}</H2>
    <Hr spacer size="micro" />
    <H3>{knobs.H3()}</H3>
    <Hr spacer size="micro" />
    <H4>{knobs.H4()}</H4>
    <Hr spacer size="micro" />
    <Span bold>{knobs.SpanNormalBold()}</Span>
    <Hr spacer size="micro" />
    <Span>{knobs.SpanNormalRegular()}</Span>
    <Hr spacer size="micro" />
    <Span bold size="small">
      {knobs.SpanSmallBold()}
    </Span>
    <Hr spacer size="zero" />
    <Span size="small">{knobs.SpanSmallRegular()}</Span>
    <Hr spacer size="micro" />
    <Span bold size="micro">
      {knobs.SpanMicroBold()}
    </Span>
    <Hr spacer size="zero" />
    <Span size="micro">{knobs.SpanMicroRegular()}</Span>
    <Hr spacer size="micro" />
    <Span bold size="nano">
      {knobs.SpanNanoBold()}
    </Span>
    <Hr spacer size="zero" />
    <Span size="nano">{knobs.SpanNanoRegular()}</Span>
    <Hr spacer />
    <Hr size="micro" />
  </>
);
