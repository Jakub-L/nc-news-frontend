# NC News

React app for a website serving articles and comments.

# Table of Contents

- [Getting Started](#getting-started)
- [— Installation](#installation)
- [Testing](#testing)
- [— Unit Testing](#unit-testing)
- [— Integration Testing](#integration-testing)
- [Deployment](#deployment)
- [API](#api)
- [Available Scripts](#available-scripts)
- [Built With](#built-with)
- [Authors](#authors)

# Getting Started

These instructions will get you a copy of the project running on your local machine. This is for testing and development only; for production see [deployment](#deployment)

## Installation

Clone this repository:

```
git clone https://github.com/Jakub-L/nc-news-frontend.git
```

Install the package dependencies:

```
npm install
```

Start the development server:

```
npm start
```

The website can now be reached at localhost on port 3000.

# Testing

## Unit Testing

Unit testing is done via React's in-built [Jest](https://jestjs.io/) testing suite.
In order to run the automated unit tests for utility functions, run the following command:

```
npm test
```

## Integration Testing

Integration and end-to-end testing is managed via [Cypress](https://www.cypress.io/). In order to run the tests, run the following command:

```
npm run cy:open
```

This will open Cypress and allow for running of the tests.

# Deployment

The app is [hosted on Netlify](https://nc-news-jakub.netlify.com/).

# API

The app uses a separate back-end to serve its data.

The [repository](https://github.com/Jakub-L/nc-news-api) is hosted on GitHub, and the [live version](https://nc-news-jakub.herokuapp.com/) is hosted on Heroku

# Available Scripts

- **`npm start`** - initialise the local development server,
- **`npm run build`** - build the app into the `build` folder,
- **`npm test`** - run the Jest test suite for unit testing,
- **`npm eject`** - remove single-build dependency from project,
- **`npm run cy:open`** - open cypress for end-to-end testing

# Built With

- **[React](https://reactjs.org/)**: basic library,
- **[Axios](https://github.com/axios/axios)**: request library used for API calls,
- **[Reach Router](https://reach.tech/router)**: route management,
- **[Cypress](https://www.cypress.io/)**: end-to-end testing,

# Authors

- **[Jakub-L](https://github.com/Jakub-L)**: Initial work
