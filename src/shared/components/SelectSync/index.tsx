import React, { useState } from 'react';

import { SelectSync as SelectSyncUi } from './SelectSync';

export type Value = {
  value: string | number;
  label: string;
};

interface Props {
  placeholder?: string;
  label?: string;
  options: Value[];
  value: Value[];
  defaultOptions: Value[];
  grow?: boolean;
  maxItems?: number;
  onChange?: (params?: unknown) => void;
  onInputChange?: (params: unknown) => void;
}

const SelectSync: React.FC<Props> = ({
  placeholder,
  label,
  options,
  value,
  defaultOptions,
  onInputChange,
  grow,
  onChange,
  maxItems,
}) => {
  const [focus, setFocus] = useState(false);
  const focusOrContent = !!value?.length || focus;

  const onValueChange = (values) => {
    onChange(values);
  };

  return (
    <SelectSyncUi
      placeholder={placeholder}
      label={label}
      focusOrContent={focusOrContent}
      options={options}
      value={value}
      defaultOptions={defaultOptions}
      onInputChange={onInputChange}
      onChange={onValueChange}
      grow={grow}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      maxItems={maxItems}
    />
  );
};

export default SelectSync;
