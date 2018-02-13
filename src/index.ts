export * from './calendar.service';
export * from './date-range-picker.model';
export * from './date-range-picker.comp';
export * from './picker-calendar.comp';

import {
  PickerCalendarComponent,
  DateRangePickerComponent
} from './';

class DatesPickyModule {
  static bootstrap() {
    angular.module("dates-picky", [])
      .component('pickerCalendar', new PickerCalendarComponent())
      .component('dateRangePicker', new DateRangePickerComponent());
  }
}

DatesPickyModule.bootstrap();