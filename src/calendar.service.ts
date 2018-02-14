import * as moment from 'moment';

const daysInWeek = 7;

export class CalendarService {
  groupByWeeks(days: ICalendarDay[]): ICalendarDay[][] {
    const res = [];
    if (!days || days.length === 0) {
      return [];
    }

    return days.reduce((rows: any[], key, index) => {
      return (index % daysInWeek === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows;
    }, []);
  }

  getMonthDays(date: Date): ICalendarDay[][] {
    let day = this.getFirstDay(date);
    const lastDay = this.getLastDay(date);
    const currentMonth = moment(date).month();
    const currentDay = moment().format('YYYY-MM-DD');

    const days: ICalendarDay[] = [];

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

    return this.groupByWeeks(days);
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