import React, { Component } from 'react';
import DatePickerComponent from 'react-datepicker';
import moment from 'moment';

import { Input } from '../Input';

import './DatePicker.less';

const MOMENT_DATE_FORMAT = 'YYYY-MM-DD';

interface Props {
  name: string;
  label: string;
  value: Date;
  locale?: string;
  disabled?: boolean;
  inline?: boolean;
  showTimeSelect?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date) => void;
}

interface State {
  inputValue?: string;
  datePickerValue?: Date;
  focused?: boolean;
}

export class DatePicker extends Component<Props, State> {
  private calendarRef;

  constructor(props: Props) {
    super(props);
    this.calendarRef = React.createRef();

    const inputValue = this.props.value && moment(this.props.value).format(MOMENT_DATE_FORMAT);

    this.state = {
      inputValue,
      datePickerValue: this.props.value,
      focused: false,
    };
  }

  handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    const date = moment(event.currentTarget.value, MOMENT_DATE_FORMAT);

    this.setState({
      inputValue: event.currentTarget.value,
    });

    if (date.isValid()) {
      this.setState({
        datePickerValue: date.toDate(),
      });

      onChange(date.toDate());
    }
  };

  handleDatePickerChange = (date: Date): void => {
    const { onChange } = this.props;

    this.setState({
      datePickerValue: date,
      inputValue: moment(date).format(MOMENT_DATE_FORMAT),
    });

    onChange(date);
  };

  render = (): React.ReactNode => {
    const { value, label, locale = 'en', showTimeSelect, minDate, maxDate, disabled, inline, name } = this.props;

    const formattedDate = moment(this.state.inputValue, MOMENT_DATE_FORMAT);
    const isInputActive = formattedDate.isValid() || this.state.focused;

    return (
      <div className={'DatePicker ' + (inline ? 'DatePicker--inline' : '')}>
        {!inline && (
          <Input
            className="DatePicker-input"
            name={name}
            label={label}
            type={isInputActive ? 'date' : 'input'}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            grow
            onFocus={(): void => {
              this.calendarRef.current.setOpen(true);
              this.setState({
                focused: true,
              });
            }}
            onClick={(): void => {
              this.calendarRef.current.setOpen(true);
              this.setState({
                focused: true,
              });
            }}
            onBlur={(): void => {
              this.setState({
                focused: false,
              });
            }}
            onKeyDown={(): void => {
              this.calendarRef.current.setOpen(false);
            }}
          />
        )}
        <DatePickerComponent
          ref={this.calendarRef}
          placeholderText=" "
          className="DatePicker-input"
          calendarClassName="DatePicker-calendar"
          popperClassName="DatePicker-popper"
          disabled={disabled}
          showPopperArrow={false}
          selected={value}
          onChange={this.handleDatePickerChange}
          showTimeSelect={showTimeSelect}
          locale={locale}
          dateFormat="MM/dd/yyyy"
          timeFormat=""
          timeIntervals={30}
          minDate={minDate}
          maxDate={maxDate}
          inline={inline}
        />

        {/* {meta.touched && meta.error && <div className="DatePicker-error">{meta.error}</div>} */}
      </div>
    );
  };
}
