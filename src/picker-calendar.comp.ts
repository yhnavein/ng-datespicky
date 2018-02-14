import * as moment from 'moment';

import { DateRangePickerOptions, IPredefinedRange, ICalendarDay, CalendarService, ICalendar, DateRangePickerController } from './';
import template from './picker-calendar.html';

export class PickerCalendarController implements ng.IComponentController {
  private weekDays: string[];
  private rangePickerCtrl: DateRangePickerController;
  private nextVisible: boolean = true;
  private prevVisible: boolean = true;
  private placement: string;

  private date: moment.Moment;
  private days: ICalendarDay[][];
  private readonly calendarService = new CalendarService();

  /* @ngInject */
  constructor(private $scope: ng.IScope, private $element: ng.IRootElementService) {

  }

  $onInit() {
    this.weekDays = moment.weekdaysMin();
    this.days = this.calendarService.getMonthDays(this.date.toDate());

    this.$scope.$watch(() => this.date, (newVal, oldVal) => {
      if (newVal === oldVal) {
        return;
      }
      this.days = this.calendarService.getMonthDays(this.date.toDate());
    }, true);
  }

  getDayClasses(day: ICalendarDay) {
    const startDay = this.rangePickerCtrl.startDate && parseInt(moment(this.rangePickerCtrl.startDate).format('YYYYMMDD')) || 0;
    const endDay = this.rangePickerCtrl.endDate && parseInt(moment(this.rangePickerCtrl.endDate).format('YYYYMMDD')) || 0;

    return {
      'off': !day.inMonth,
      'weekend': day.isWeekend,
      'today': day.isToday,
      'active': day.active,
      // 'in-range': day.inRange,
      // 'start-range': day.startRange,
      'in-range': startDay > 0 && day.isoNumber > startDay && day.isoNumber < endDay,
      'start-date active': day.isoNumber === startDay,
      'end-date active': day.isoNumber === endDay
    };
  }

  changeMonth(direction: number) {
    if (direction < 0 && (this.prevVisible || this.placement === 'left') || direction > 0 && (this.nextVisible || this.placement === 'right')) {
      this.date.add(direction, 'month');
    }
  }

  onClick(day: ICalendarDay) {
    this.rangePickerCtrl.clickDay(day);
  }
}

export class PickerCalendarComponent implements ng.IComponentOptions {
  bindings: any = {
    date: '=',
    nextVisible: '<',
    prevVisible: '<',
    placement: '@'
  };
  require: any = {
    rangePickerCtrl: '^^dateRangePicker'
  };
  controller: any = PickerCalendarController;
  template: string = template;
  controllerAs: string = 'vm';
}
