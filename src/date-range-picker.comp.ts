import * as moment from 'moment';

import { DateRangePickerOptions, IPredefinedRange, ICalendarDay, CalendarService, ICalendar, ISelectedDates } from './';
import template from './date-range-picker.html';

const defaultOptions: DateRangePickerOptions = {
  autoApply: true,
  alwaysShowCalendars: true,
  opens: "center"
};

export class DateRangePickerController implements ng.IComponentController {
  placeholder: string;
  startDate?: Date;
  endDate?: Date;
  onChange: Function;
  alignment: string;
  ngModel: ISelectedDates;
  isOpened: boolean = false;
  options: DateRangePickerOptions = {};

  rightDate: moment.Moment;
  leftDate: moment.Moment;

  label: string;
  weekDays: string[];

  ranges: IPredefinedRange[] = [
    { name: 'Today', from: moment(), to: moment() },
    { name: 'Yesterday', from: moment().subtract(1, 'days'), to: moment().subtract(1, 'days') },
    { name: 'Last 7 Days', from: moment().subtract(6, 'days'), to: moment() },
    { name: 'Last 30 Days', from: moment().subtract(29, 'days'), to: moment() },
    { name: 'This Month', from: moment().startOf('month'), to: moment().endOf('month') },
    { name: 'Last Month', from: moment().subtract(1, 'month').startOf('month'), to: moment().subtract(1, 'month').endOf('month') },
    { name: 'This Year', from: moment().startOf('year'), to: moment().endOf('year') },
    // { name: 'Last Year', from: moment().subtract(1, 'year').startOf('year'), to: moment().subtract(1, 'year').endOf('year') }
  ];

  private readonly dateFormat: string = 'YYYY-MM-DD';
  private readonly calendarService = new CalendarService();

  /* @ngInject */
  constructor(private $scope: ng.IScope) {
  }

  $onInit(): void {
    this.options = angular.merge({}, defaultOptions, this.options);
    this.weekDays = moment.weekdaysMin();
    this.leftDate = moment();
    this.rightDate = moment().add(1, 'month');

    // let's watch for changes coming in from the application
    // for now let's disable this functionality
    // Later, we need to migrate our applications tu use better API from this component
    // this.$scope.$watch(() => this.ngModel, (newVal, oldVal) => {
    //   if (newVal === oldVal) {
    //     return;
    //   }

    //   if (!newVal) {
    //     this.startDate = undefined;
    //     this.endDate = undefined;
    //     this.setLabel();
    //     if (this.onChange) {
    //       this.onChange();
    //     }

    //     return;
    //   }

    //   this.startDate = newVal.startDate;
    //   this.endDate = newVal.endDate;
    //   this.setLabel();
    //   if (this.onChange) {
    //     this.onChange();
    //   }

    // }, true);

    // let's watch for changes coming in from the application
    // This functionality will be obsolete in future
    this.$scope.$watchGroup([() => this.startDate, () => this.endDate], (newVal, oldVal) => {
      if (newVal === oldVal) {
        return;
      }

      this.setLabel();
      if (this.onChange) {
        this.onChange();
      }
    });
  }

  makeSelection() {
    this.ngModel = {
      startDate: this.startDate,
      endDate: this.endDate
    };

    if (this.options.autoApply) {
      this.isOpened = false;
    }
  }

  selectRange(range: IPredefinedRange) {
    this.startDate = this.convertToUtcDate(range.from.toDate());
    this.endDate = this.convertToUtcDate(range.to.toDate());
    this.makeSelection();
  }

  apply() {
    if (this.startDate && this.endDate) {
      this.makeSelection();
      this.isOpened = false;
    }
  }

  cancel() {
    this.isOpened = false;
  }

  setLabel(): void {
    if (this.startDate !== undefined || this.endDate !== undefined) {
      const from = this.formatDate(this.startDate);
      const to = this.formatDate(this.endDate);
      this.label = from + ' - ' + to;
    } else {
      this.label = '';
    }
  }

  formatDate(date?: Date): string {
    return date ? moment(date).format(this.dateFormat) : '?';
  }

  convertToUtcDate(date: Date) {
    const extracted = moment(date).format('YYYY-MM-DD');
    return moment(extracted + 'T00:00:00.00Z').toDate();
  }

  clickDay(day: ICalendarDay) {
    const date = day.date;

    if (!this.startDate || this.endDate || date.isBefore(this.startDate, 'day')) {
      this.endDate = undefined;
      this.startDate = this.convertToUtcDate(date.toDate());
    } else if (!this.endDate && date.isBefore(this.startDate)) {
      this.endDate = this.convertToUtcDate(this.startDate);
    } else {
      this.endDate = this.convertToUtcDate(date.toDate());
    }

    if (this.endDate && this.startDate && this.options.autoApply) {
      this.makeSelection();
    }
  }

  clearSelection() {
    this.endDate = undefined;
    this.startDate = undefined;
  }

  get isMiddleNavVisible(): boolean {
    return this.rightDate.diff(this.leftDate, 'months') > 1;
  }
}

export class DateRangePickerComponent implements ng.IComponentOptions {
  bindings: any = {
    placeholder: '@',
    startDate: '=?',
    endDate: '=?',
    onChange: '&?',
    options: '<',
    ngModel: '=?'
  };
  controller: any = DateRangePickerController;
  template: string = template;
  controllerAs: string = 'vm';
}