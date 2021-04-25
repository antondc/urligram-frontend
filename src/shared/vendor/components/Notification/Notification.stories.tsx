import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { A } from '../A';
import { Hr } from '../Hr';
import { Span } from '../Span';
import { Notification } from '.';

export default {
  component: Notification,
  title: 'Notification',
  decorators: [withKnobs],
};

export const Default: React.FC = () => (
  <>
    <Notification type="success">
      <Span bold size="normal">
        Some title
      </Span>
      <div>
        <Span size="small">
          Something happened, click{' '}
          <A href="https://google.es" targetBlank frontend underlined>
            here
          </A>{' '}
          to know more{' '}
        </Span>
      </div>
    </Notification>
    <Hr spacer size="small" />
    <Notification type="error">
      <Span bold size="normal">
        Some title
      </Span>
      <div>
        <Span size="small">
          Something happened, click{' '}
          <A href="https://google.es" targetBlank frontend underlined>
            here
          </A>{' '}
          to know more{' '}
        </Span>
      </div>
    </Notification>
    <Hr spacer size="small" />
    <Notification type="alert">
      <Span bold size="normal">
        Some title
      </Span>
      <div>
        <Span size="small">
          Something happened, click{' '}
          <A href="https://google.es" targetBlank frontend underlined>
            here
          </A>{' '}
          to know more
        </Span>
      </div>
    </Notification>
    <Hr spacer size="small" />
  </>
);
