// import React, { Component } from 'react';

// import SelectUi from './SelectUi';

// export interface Value {
//   id: number;
//   label: string;
//   value: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export type LoadOptionsFromServer = (inputValue: any) => Promise<{ data: Value[] }>;

// export interface Props {
//   label: string;
//   value?: any;
//   grow?: boolean;
//   limit?: number;
//   optionFilterFieldName?: string;
//   onChange?: (e) => void;
//   loadOptionsFromServer: LoadOptionsFromServer;
// }

// export class Select extends Component<Props> {
//   constructor(props: Props) {
//     super(props);
//     console.clear();
//   }

//   loadOptions = async (inputValue: string): Promise<Value[]> => {
//     console.log('loadOptions: ', true);

//     const { loadOptionsFromServer } = this.props;
//     const options = await loadOptionsFromServer(inputValue);
//     const optionsFormatted = options.data.map((item) =>
//       Object.assign(item, {
//         label: item.name,
//         value: item.name,
//       })
//     );

//     return optionsFormatted;
//   };

//   onChange = (newValues: Value[]): void => {
//     const { onChange, limit, value } = this.props;
//     const updateValues = !newValues || newValues.length <= limit;
//     const updatedValues = updateValues ? newValues : value;

//     onChange(updatedValues);
//   };

//   render = (): React.ReactNode => {
//     const { grow, value, label, limit } = this.props;

//     return (
//       <div className={'Select ' + (grow ? 'Select--grow' : '')}>
//         <SelectUi
//           label={label}
//           loadOptions={this.loadOptions}
//           limit={limit}
//           value={value}
//           onChange={this.onChange}
//           grow={grow}
//         />
//       </div>
//     );
//   };
// }
