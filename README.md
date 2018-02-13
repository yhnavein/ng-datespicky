# AngularJS DatesPicky

> AngularJS Date Range Picker written in TypeScript with no additional dependencies

## How to use it

If you want to add this library to your project just run:

```sh
# yarn (recommended)
yarn add ng-datespicky

# npm
npm i --save ng-datespicky
```

When package is installed just add `dates-picky` as dependency in main app module:

```js
angular.module('app', [..., 'dates-picky', ...]);
```

## How to Contribute

### Configure dev's environment

First of all, you need to have this library present on your hard disk. Let's start with cloning this repository

```sh
git clone git@github.com:yhnavein/ng-datespicky.git
```

After that you need to link npm library with this repository:

```sh
cd ng-datespicky
yarn link
cd ../APP-PROJECT # go to the project location
yarn link "ng-datespicky"
```

This will create a symbolic link from your project to this library and you will see changes almost instantly

!!! note
    You need to rebuild source with **yarn build** command. For convenience, you should use **yarn watch** to automatically watch for changes.