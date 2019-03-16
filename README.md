# VueJS Vuetify Vue Router Vuex - Basic Project Skeleton

[![Author](http://img.shields.io/badge/author-@davellanedam-blue.svg?style=flat-square)](https://twitter.com/davellanedam)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/davellanedam/vue-skeleton-mvp/blob/master/LICENSE)
[![Tag](https://img.shields.io/github/tag/davellanedam/vue-skeleton-mvp.svg?style=flat-square)](https://github.com/davellanedam/vue-skeleton-mvp/tags)

## Getting started

This is a basic VueJs, Vuetify, Vue Router and Vuex skeleton written on JavaScript using async/await. Great for building an MVP for your project.

This project is created to help other developers create a **basic VueJS app in an easy way**. This basic example shows how powerful and simple JavaScript and VueJS can be. Do you want to contribute? Pull requests are always welcome to show more features.

## Features

- Vuetify
- Multiple environment ready (development, production).
- Vue router
- Vuex
- i18n ready.
- Landing page.
- Protected home page.
- Login.
- Signup.
- Forgot password.
- Account verification.
- User profile.
- Users admin area with CRUD operations.
- Cities admin area with CRUD operations.
- Testing with Cypress and mocha/chai.
- NPM script for keeping good source code formatting using prettier and ESLint.
- Use of ESLint for good coding practices.
- Use of prettier for beautiful format.
- JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` is the **signed and encrypted token** given in the response from the login process.

## Demo

A demo of this API is located at: https://vue-demo.daniel-avellaneda.com

### Login credentials:

email: `admin@admin.com`  
password: `12345`

**IMPORTANT:** Database resets every 30 mins like "12:00am, 12:30am, 1:00am" and so on. So anything you do with the API will be lost after a short time.

Demo is also linked to a VueJS project that shows how this frontend can be integrated to an API.  
Repo is here: https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton  
Running demo is here: https://api-demo.daniel-avellaneda.com

## How to install

### Using Git (recommended)

1. Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/davellanedam/vue-skeleton-mvp.git ./myproject
```

### Using manual download ZIP

1. Download repository
2. Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
npm update
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Bugs or improvements

Feel free to report any bugs or improvements. Pull requests are always welcome.

## I love this! How can I help?

It´s amazing you feel like that! Send me a tweet https://twitter.com/davellanedam, share this with others, make a pull request or if you feel really thankful you can always buy me a beer! Enjoy!

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
