import React from 'react';
import Select, {
  components as Components,
  ContainerProps,
  IndicatorProps,
  MenuProps,
  MultiValueProps,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import Cross from 'Assets/svg/cross.svg';
import { ArrowDown } from '../Svg';
import { SelectValue } from '.';

import './Select.less';

interface Props {
  isCreatable?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  hideLabelOnFill?: boolean;
  focusOrContent: boolean;
  options: SelectValue[];
  isMulti: boolean;
  value: SelectValue[];
  defaultOptions: SelectValue[];
  grow?: boolean;
  maxItems?: number;
  height?: 'small' | 'medium';
  onChange?: (params: SelectValue[]) => void;
  onInputChange: (params: unknown) => void;
  onFocus: () => void;
  onBlur: () => void;
}

type MenuType = {
  selectProps: {
    maxItems: number;
  };
};

const Menu = ({ ...props }: MenuType & MenuProps<any, any>): JSX.Element => {
  const {
    selectProps: { maxItems, isMulti },
  } = props;
  const showOptions = !isMulti || !maxItems || (props.getValue().length || 0) < maxItems;

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
    <Cross className="Select__multi-value__remove__svg" />
  </Components.MultiValueRemove>
);

const SelectContainer = ({ children, ...props }: ContainerProps<any, any>): JSX.Element => (
  <Components.SelectContainer {...props}>{children}</Components.SelectContainer>
);

const DropdownIndicator = (props: IndicatorProps<any, any>): JSX.Element => (
  <Components.DropdownIndicator {...props}>
    <ArrowDown size="small" />
  </Components.DropdownIndicator>
);

const LoadingMessage = (): null => null;

const NoOptionsMessage = (): null => null;

const SelectComponent = ({ isCreatable, ...props }) =>
  isCreatable ? <CreatableSelect {...props} /> : <Select {...props} />;

export const SelectUi: React.FC<Props> = ({
  isCreatable,
  className,
  options,
  isMulti,
  value,
  defaultOptions,
  onInputChange,
  grow,
  onChange,
  placeholder,
  label,
  hideLabelOnFill,
  focusOrContent,
  onFocus,
  onBlur,
  maxItems,
  height,
}) => (
  <div className={'Select ' + (className ? className : ' ') + (grow ? ' Select--grow' : ' ') + (' Select--' + height)}>
    <SelectComponent
      isCreatable={isCreatable}
      className="Select__container"
      classNamePrefix="Select"
      closeMenuOnSelect
      value={value}
      isMulti={isMulti}
      isClearable
      placeholder={!label ? placeholder : ' '}
      cacheOptions
      defaultOptions={defaultOptions}
      options={options}
      onInputChange={onInputChange}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      maxItems={maxItems}
      components={{
        Menu: Menu,
        DropdownIndicator: DropdownIndicator,
        MultiValueRemove: MultiValueRemove,
        SelectContainer: SelectContainer,
        LoadingMessage: LoadingMessage,
        NoOptionsMessage: NoOptionsMessage,
      }}
    />
    {!placeholder && label && (
      <label
        className={
          'Select__label' +
          (focusOrContent ? ' Select__label--active' : '') +
          (hideLabelOnFill ? ' Select__label--hideLabel' : '')
        }
      >
        <span className="Select__label-background" />
        <span className="Select__multi-value__label Select__multi-value__label-custom">{label}</span>
      </label>
    )}
  </div>
);
