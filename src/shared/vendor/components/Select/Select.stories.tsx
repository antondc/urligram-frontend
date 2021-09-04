import React, { useState } from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Span } from '../Span';
import { Select, SelectValue } from '.';

export default {
  component: Select,
  title: 'Select',
  decorators: [withKnobs],
};

export const Default: React.FC = () => {
  const [value, setValue] = useState<SelectValue[]>([{ label: 'Tag', value: 'Tag' }]);

  return (
    <div>
      <H1>Select</H1>
      <Span size="small">You can select tags here as example</Span>
      <Hr spacer />
      <div style={{ width: '500px' }}>
        <Select
          placeholder="Select tags"
          value={value}
          defaultOptions={[]}
          options={[
            {
              label: 'Tag',
              value: 'Tag',
            },
            {
              label: 'label 2',
              value: 'value 2',
            },
            {
              label: 'label 3',
              value: 'value 3',
            },
            {
              label: 'label 4',
              value: 'value 4',
            },
            {
              label: 'label 5',
              value: 'value 5',
            },
            {
              label: 'label 6',
              value: 'value 6',
            },
            {
              label: 'label 7',
              value: 'value 7',
            },
            {
              label: 'label 8',
              value: 'value 8',
            },
            {
              label: 'label 9',
              value: 'value 9',
            },
            {
              label: 'label 10',
              value: 'value 10',
            },
          ]}
          grow
          onChange={(incomingValue: SelectValue[]) => setValue(incomingValue)}
          maxItems={5}
          isCreatable
        />
      </div>
    </div>
  );
};
