import * as moment from 'moment';

export class DateRangePickerOptions {
  startDate?: Date | moment.Moment | string;
  endDate?: Date | moment.Moment | string;
  minDate?: Date | moment.Moment | string;
  maxDate?: Date | moment.Moment | string;
  dateLimit?: string;
  showDropdowns?: boolean;
  showWeekNumbers?: boolean;
  showISOWeekNumbers?: boolean;
  // timePicker?: boolean;
  // timePickerIncrement?: number;
  // timePicker24Hour?: boolean;
  // timePickerSeconds?: boolean;
  ranges?: any;
  showCustomRangeLabel?: boolean;
  alwaysShowCalendars?: boolean;
  opens?: string; // can be list of acceptable values
  drops?: string; // can be list of acceptable values
  buttonClasses?: string[];
  applyClass?: string;
  cancelClass?: string;
  locale?: any;
  singleDatePicker?: boolean;
  autoApply?: boolean;
  linkedCalendars?: boolean;
  isInvalidDate?: Function;
  isCustomDate?: Function;
  autoUpdateInput?: boolean;
  parentEl?: string;
}

export interface IPredefinedRange {
  name: string;
  from: moment.Moment;
  to: moment.Moment;
}

export interface ISelectedDates {
  startDate?: Date;
  endDate?: Date;
}