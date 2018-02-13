import * as moment from 'moment';
import { groupBy } from 'lodash';

export class CalendarService {
  getMonthDays(date: Date): ICalendarDay[][] {
    let day = this.getFirstDay(date);
    const lastDay = this.getLastDay(date);
    const currentMonth = moment(date).month();
    const currentDay = moment().format('YYYY-MM-DD');

    const days: Array<ICalendarDay> = [];

    while (day.isBefore(lastDay)) {
      const isoName = day.format('YYYY-MM-DD');

      days.push({
        label: day.date(),
        date: day.clone(),
        isToday: currentDay === isoName,
        isoName: isoName,
        inMonth: day.month() === currentMonth,
        weekNumber: day.week(),
        isoNumber: parseInt(day.format('YYYYMMDD')),
        isWeekend: [0, 6].indexOf(day.day()) > -1
      });

      day.add(1, 'day');
    }
    const groups = groupBy(days, (el) => el.weekNumber);
    const keys = Object.keys(groups);
    return keys.map((key) => groups[key]);
  }

  private getFirstDay(date: Date) {
    return moment(date).startOf('month').startOf('week');
  }

  private getLastDay(date: Date) {
    return moment(date).endOf('month').endOf('week');
  }
}

export interface ICalendarDay {
  label: number;
  date: moment.Moment;
  inMonth: boolean;
  isWeekend: boolean;
  isoName: string;
  isoNumber: number;
  weekNumber: number;
  isToday: boolean;
  active?: boolean;
  inRange?: boolean;
  startRange?: boolean;
  endRange?: boolean;
}

export interface ICalendar {
  date: moment.Moment;
  days?: ICalendarDay[][];
}