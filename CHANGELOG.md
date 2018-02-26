# AngularJS DatesPicky

## v 0.0.6
* [Fix] Always update label, not only when the new value is different. It fixes an issue when on load of the page there was no indication that dates were already set.

## v 0.0.5
* [New] Added button for clearing selection
* [Improvement] Improved styles of the component. Better theme will be done later :)

## v 0.0.4
* [Fix] Fixed bug with `onChange` event firing 3 times instead of 1
* [Improvement] Temporarily disabling `ngModel` watchers
* [Improvement] UTC dates are used now
* [Improvement] Trimming time (and timezone) part of the date.

## v 0.0.3
* [New] Added placeholder to the control
* [New] Added type for ngModel with selected dates

## v 0.0.2
* [Fix] Left calendar is always before right one
* [Fix] Fixed problem with wrongly sorted weeks in decembers
* [Improvement] Removed LoDash dependency

## v 0.0.1
* Initial release