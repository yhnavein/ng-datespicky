# AngularJS DatesPicky

> AngularJS Date Range Picker written in TypeScript with no additional dependencies

This library is based on the popular [Date Range Picker](http://www.daterangepicker.com/), but unlike many Angular date pickers, does not depend on it.

Code is written in AngularJS directly in TypeScript.

## How to use it

If you want to add this library to your project just run:

```sh
# yarn (recommended)
yarn add ng-datespicky

# npm
npm i --save ng-datespicky
```

When package is installed add `dates-picky` as dependency in main app module:

```js
angular.module('app', [..., 'dates-picky', ...]);
```

Additionally you need to include styles for `dates-picky` as well. If you are using Webpack, you can do this by including this line in your `scss` files:

```scss
@import "~ng-datespicky/src/styles";
```

In the future there will be css files bundled in the build as well.

## How to Contribute

### Configure dev's environment

First of all, you need to have this library present on your hard disk. Let's start with cloning this repository

```sh
git clone git@github.com:yhnavein/ng-datespicky.git
yarn
```

After that you need to link npm library with this repository:

```sh
cd ng-datespicky
yarn link
cd ../APP-PROJECT # go to the project location
yarn link "ng-datespicky"
```

This will create a symbolic link from your project to this library and you will see changes almost instantly