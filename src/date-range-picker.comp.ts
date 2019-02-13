import * as moment from 'moment';

import { DateRangePickerOptions, IPredefinedRange, ICalendarDay, CalendarService, ISelectedDates } from './';
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
    { name: 'Today', from: moment.utc(), to: moment.utc() },
    { name: 'Yesterday', from: moment.utc().subtract(1, 'days'), to: moment.utc().subtract(1, 'days') },
    { name: 'Last 7 Days', from: moment.utc().subtract(6, 'days'), to: moment.utc() },
    { name: 'Last 30 Days', from: moment.utc().subtract(29, 'days'), to: moment.utc() },
    { name: 'This Month', from: moment.utc().startOf('month'), to: moment.utc().endOf('month') },
    { name: 'Last Month', from: moment.utc().subtract(1, 'month').startOf('month'), to: moment.utc().subtract(1, 'month').endOf('month') },
    { name: 'This Year', from: moment.utc().startOf('year'), to: moment.utc().endOf('year') },
    // { name: 'Last Year', from: moment.utc().subtract(1, 'year').startOf('year'), to: moment.utc().subtract(1, 'year').endOf('year') }
  ];

  private readonly dateFormat: string = 'YYYY-MM-DD';

  /* @ngInject */
  constructor(private $scope: ng.IScope) {
  }

  $onInit(): void {
    this.options = angular.merge({}, defaultOptions, this.options);
    this.weekDays = moment.weekdaysMin();
    this.leftDate = moment.utc();
    this.rightDate = moment.utc().add(1, 'month');

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
    this.$scope.$watchGroup([() => this.startDate], (newVal, oldVal) => this.pickedDateChanged(newVal, oldVal, true));
    this.$scope.$watchGroup([() => this.endDate], (newVal, oldVal) => this.pickedDateChanged(newVal, oldVal, false));
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
    this.startDate = range.from.utc().toDate();
    this.endDate = range.to.utc().toDate();
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

  clickDay(day: ICalendarDay) {
    const date = day.date;

    if (!this.startDate || this.endDate || date.isBefore(this.startDate, 'day')) {
      this.endDate = undefined;
      this.startDate = date.toDate();
    } else if (!this.endDate && date.isBefore(this.startDate)) {
      this.endDate = this.startDate;
    } else {
      this.endDate = date.toDate();
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
    return this.monthDiff(this.leftDate, this.rightDate) > 1;
  }

  private pickedDateChanged(newVal: any, oldVal: any, isStartDate: boolean): void {
    this.setLabel();
    if (newVal === oldVal) {
      return;
    }
    isStartDate ? this.updateLeftDate() : this.updateRightDate();

    if (this.onChange) {
      this.onChange();
    }

  }

  private updateLeftDate(): void {
    if (this.startDate) {
      if (!this.isDateDisplayed(moment(this.startDate))) {
        this.leftDate = moment(this.startDate);
      }
    }
  }

  private updateRightDate(): void {
    if (this.endDate) {
      if (!this.isDateDisplayed(moment(this.endDate))) {
        this.rightDate = moment(this.endDate);
      }
    }
  }

  private isDateDisplayed(date: moment.Moment): boolean {
    return (this.leftDate && date.month() === this.leftDate.month()) || (this.rightDate && date.month() === this.rightDate.month());
  }

  private monthDiff(beforeDate: moment.Moment, afterDate: moment.Moment): number {
    return (afterDate.month() + afterDate.year() * 12) - (beforeDate.month() + beforeDate.year() * 12);
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