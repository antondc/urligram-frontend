import React, { useEffect, useState } from 'react';

import { SelectSync as SelectSyncUi } from './SelectSync';

export type Value = {
  value: string | number;
  label: string;
};

interface Props {
  options: Value[];
  defaultValue: Value | Value[];
  defaultOptions: Value[];
  grow?: boolean;
  onChange?: (params?: unknown) => void;
  onInputChange?: (params: unknown) => void;
}

const SelectSync: React.FC<Props> = ({ options, defaultValue, defaultOptions, onInputChange, grow, onChange }) => {
  const [values, setValues] = useState<Value[] | Value>();

  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);

  const onValueChange = (values) => {
    setValues(values);
    onChange(values);
  };

  return (
    <SelectSyncUi
      options={options}
      value={values}
      defaultOptions={defaultOptions}
      onInputChange={onInputChange}
      onChange={onValueChange}
      grow={grow}
    />
  );
};

export default SelectSync;
