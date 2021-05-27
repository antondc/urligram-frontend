import React, { useState } from 'react';

import { SelectUi } from './Select';

export type SelectValue = {
  value: string | number;
  label: string;
};

interface Props {
  isCreatable?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  options: SelectValue[];
  isMulti?: boolean;
  value: SelectValue[];
  defaultOptions: SelectValue[];
  grow?: boolean;
  maxItems?: number;
  onChange?: (params: SelectValue[]) => void;
  onInputChange?: (params: unknown) => void;
}

export const Select: React.FC<Props> = ({
  isCreatable = false,
  className,
  placeholder,
  label,
  options,
  isMulti = true,
  value,
  defaultOptions,
  onInputChange,
  grow,
  onChange,
  maxItems,
}) => {
  const [focus, setFocus] = useState(false);
  const focusOrContent = (!!value?.length && value[0] !== null) || focus;

  const onSelectValueChange = (values) => {
    const isArray = Array.isArray(values);
    const valuesArray = !isArray ? [values] : values;
    const valuesArrayNoNull = valuesArray.filter((item) => item !== null);
    const finalValues = valuesArrayNoNull;

    onChange(finalValues);
  };

  return (
    <SelectUi
      isCreatable={isCreatable}
      className={className}
      placeholder={placeholder}
      label={label}
      focusOrContent={focusOrContent}
      options={options}
      isMulti={isMulti}
      value={value}
      defaultOptions={defaultOptions}
      onInputChange={onInputChange}
      onChange={onSelectValueChange}
      grow={grow}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      maxItems={maxItems}
    />
  );
};
