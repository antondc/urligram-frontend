import React from 'react';
import Select, {
  components as Components,
  ContainerProps,
  IndicatorProps,
  MenuProps,
  MultiValueProps,
} from 'react-select';

import { ArrowDown, Cross } from '@antoniodcorrea/components';
import { Value } from '.';

import './SelectSync.less';

interface Props {
  options: Value[];
  value: Value | Value[];
  defaultOptions: Value[];
  grow?: boolean;
  onChange: (params: unknown) => void;
  onInputChange: (params: unknown) => void;
}

const Menu = ({ ...props }: { limit: number } & MenuProps<any, any>): JSX.Element => {
  const { limit } = props;
  const optionSelectedLength = props.getValue().length || 0;
  const showOptions = !limit || optionSelectedLength < limit;

  return (
    <Components.Menu {...props}>
      {showOptions ? (
        props.children
      ) : (
        <div className="Select__option Select__option--is-disabled">Max limit reached</div>
      )}
    </Components.Menu>
  );
};

const MultiValueRemove = (props: MultiValueProps<unknown>): JSX.Element => (
  <Components.MultiValueRemove {...props}>
    <Cross size="micro" />
  </Components.MultiValueRemove>
);

const SelectContainer = ({ children, ...props }: Value & ContainerProps<any, any>): JSX.Element => {
  const { value, label } = props;

  return (
    <Components.SelectContainer {...props}>
      {children}
      <label className={'Select__label ' + (value ? 'Select__label--active' : '')}>{label}</label>
    </Components.SelectContainer>
  );
};

const DropdownIndicator = (props: IndicatorProps<any, any>): JSX.Element => (
  <Components.DropdownIndicator {...props}>
    <ArrowDown size="small" />
  </Components.DropdownIndicator>
);

const LoadingMessage = (): null => null;

const NoOptionsMessage = (): null => null;

export const SelectSync: React.FC<Props> = ({ options, value, defaultOptions, onInputChange, grow, onChange }) => (
  <div className={'SelectSync ' + (grow ? 'SelectSync--grow' : '')}>
    <Select
      className={'SelectSync__container'}
      classNamePrefix={'SelectSync'}
      closeMenuOnSelect
      value={value}
      isMulti
      placeholder=" "
      cacheOptions
      defaultOptions={defaultOptions}
      options={options}
      onInputChange={onInputChange}
      onChange={onChange}
      components={{
        Menu: Menu,
        DropdownIndicator: DropdownIndicator,
        MultiValueRemove: MultiValueRemove,
        SelectContainer: SelectContainer,
        LoadingMessage: LoadingMessage,
        NoOptionsMessage: NoOptionsMessage,
      }}
    />
  </div>
);
