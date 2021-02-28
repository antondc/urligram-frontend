// import React, { JSXElementConstructor } from 'react';
// import { components } from 'react-select';
// import AsyncCreatableSelect from 'react-select/async-creatable';

// import { ArrowDown, Cross } from '@antoniodcorrea/components';
// import { Value } from '.';

// import './Select.less';

// interface Props {
//   label: string;
//   value?: Value;
//   grow?: boolean;
//   limit?: number;
//   onChange: any;
//   loadOptions: any;
// }

// class SelectUi extends React.Component<Props> {
//   Menu = (props) : JSX.Element=> {
//     const { limit } = this.props;
//     const optionSelectedLength = props.getValue().length || 0;
//     const showOptions = !limit || optionSelectedLength < limit;

//     return (
//       <components.Menu {...props}>
//         {showOptions ? (
//           props.children
//         ) : (
//           <div className="Select__option Select__option--is-disabled">Max limit reached</div>
//         )}
//       </components.Menu>
//     );
//   };

//   DropdownIndicator = (props: unknown): JSX.Element => (
//     <components.DropdownIndicator {...props}>
//       <ArrowDown size="small" />
//     </components.DropdownIndicator>
//   );

//   MultiValueRemove = (props: unknown): JSX.Element => (
//     <components.MultiValueRemove {...props}>
//       <Cross size="micro" />
//     </components.MultiValueRemove>
//   );

//   SelectContainer = ({ children, ...props }: { [key: string]: unknown }): JSX.Element => {
//     const { value, label } = this.props;

//     return (
//       <components.SelectContainer {...props}>
//         {children}
//         <label className={'Select__label ' + (value ? 'Select__label--active' : '')}>{label}</label>
//       </components.SelectContainer>
//     );
//   };

//   LoadingMessage = (): unknown => null;

//   NoOptionsMessage = (): unknown => null;

//   render = (): JSX.Element => {
//     const { grow, value, loadOptions, onChange } = this.props;

//     return (
//       <div className={'Select ' + (grow ? 'Select--grow' : '')}>
//         <AsyncCreatableSelect
//           placeholder=" "
//           classNamePrefix={'Select'}
//           className={'Select__container'}
//           isMulti
//           cacheOptions
//           defaultOptions
//           loadOptions={loadOptions}
//           value={value}
//           isClearable={false}
//           onChange={onChange}
//           components={{
//             Menu: this.Menu,
//             DropdownIndicator: this.DropdownIndicator,
//             MultiValueRemove: this.MultiValueRemove,
//             SelectContainer: this.SelectContainer,
//             LoadingMessage: this.LoadingMessage,
//             NoOptionsMessage: this.NoOptionsMessage,
//           }}
//         />
//       </div>
//     );
//   };
// }
// export default SelectUi;
