# VueJS Vuetify Vue Router Vuex - Basic Project Skeleton

[![Author](http://img.shields.io/badge/author-@davellanedam-blue.svg?style=flat-square)](https://twitter.com/davellanedam)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/davellanedam/vue-skeleton-mvp/blob/master/LICENSE)
[![Tag](https://img.shields.io/github/tag/davellanedam/vue-skeleton-mvp.svg?style=flat-square)](https://github.com/davellanedam/vue-skeleton-mvp/tags)
[![Travis](https://img.shields.io/travis/com/davellanedam/vue-skeleton-mvp.svg?style=flat-square)](<>)
[![npm downloads](https://img.shields.io/npm/dt/vue-skeleton-mvp.svg?style=flat-square&label=npm%20downloads)](<>)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a3e7e1611c3b4a06a6c1df9391e3fe7a)](https://www.codacy.com/app/davellanedam/vue-skeleton-mvp?utm_source=github.com&utm_medium=referral&utm_content=davellanedam/vue-skeleton-mvp&utm_campaign=Badge_Grade)

## Getting started

This is a basic VueJs, Vuetify, Vue Router and Vuex skeleton written on JavaScript using async/await. Great for building a starter web app.

This project is created to help other developers create a **basic VueJS app in an easy way**. This basic example shows how powerful and simple JavaScript and VueJS can be. Do you want to contribute? Pull requests are always welcome to show more features.

## Buy me a coffee

Hi! I'm Daniel Avellaneda, I'm an open source enthusiast and devote my free time to building projects in this field.

I'm the creator and maintainer of [node-express-mongodb-jwt-rest-api-skeleton](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/blob/master/README.md) and [vue-skeleton-mvp](https://github.com/davellanedam/vue-skeleton-mvp/blob/master/README.md)

These projects are a "starter web app kit" for any developer who wants to build their own app without starting from scratch: API + Frontend

Both projects have been downloaded thousands of times by web developers around the world.

I'm doing my best to provide you a good experience when using my apps, so if you like what I'm doing and wish to say "thanks!", please buy me a coffee :coffee:

<a href="https://www.buymeacoffee.com/muGHf41NT" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

Feel free to send me a tweet <https://twitter.com/davellanedam>, share this with others or make a pull request

## Features

-   Vuetify
-   Multiple environment ready (development, production).
-   Vue router
-   Vuex
-   i18n ready.
-   Google Analytics ready.
-   Ready to add to home screen in iOS and Chrome, checks if there´s an app update every 2 hours and reloads page (When a web app is added as stand alone there´s no reload button in the browser so new .js files from a new build never get loaded)
-   Landing page.
-   Protected home page.
-   Login.
-   Signup.
-   Forgot password.
-   Account verification.
-   User profile.
-   Users admin area with CRUD operations.
-   Cities admin area with CRUD operations.
-   Testing with Cypress and mocha/chai.
-   NPM script for keeping good source code formatting using prettier and ESLint.
-   Use of ESLint for good coding practices.
-   Use of prettier for beautiful format.
-   Ability to refresh token
-   JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` is the **signed and encrypted token** given in the response from the login process.

## Demo

A demo of this Frontend is located at: <https://vue-demo.daniel-avellaneda.com>

### Login credentials

email: `admin@admin.com`  
password: `12345`

**IMPORTANT:** Database resets every 30 mins like "12:00am, 12:30am, 1:00am" and so on. So anything you do will be lost after a short time.

Demo is also linked to a Node.js express.js MongoDB JWT REST API project that shows how this frontend can be integrated to an API.  
Repo is here: <https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton>  
Running demo is here: <https://api-demo.daniel-avellaneda.com>

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/davellanedam/vue-skeleton-mvp.git ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
npm update
```

## VERY IMPORTANT

This project uses Vue Router HTML5 History Mode, this means when you are in development mode you can hit Cmd+R (mac) or F5 (Windows) to reload the page and it will work, but when the project is built you will have problems, so will need to do a small change in your web server to make that work. Please read the official Vue Router documentation here: <https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations>

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

### Formatting markdown files

```bash
npm run remark
```

### Run your end-to-end tests

```bash
npm run test:e2e
```

### Run your unit tests

```bash
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Bugs or improvements

Feel free to report any bugs or improvements. Pull requests are always welcome.

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
