<h1 align="center">Journey Jot </h1>

<div style= "text-align: center">

  <img src="https://img.shields.io/github/repo-size/Umbelth94/JourneyJot" />
  <img src="https://img.shields.io/github/languages/top/Umbelth94/JourneyJot" />
  <img src="https://img.shields.io/github/last-commit/Umbelth94/JourneyJot" />
<br /><br />

![Static Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&labelColor=black)
![Static Badge](https://img.shields.io/badge/MySQL%20-%20%234479A1?style=for-the-badge&logo=mysql&logoColor=%234479A1&labelColor=white)
![Static Badge](https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=node.js&labelColor=black)
![Static Badge](https://img.shields.io/badge/sequelize%20-%20%2352B0E7?style=for-the-badge&logo=sequelize&labelColor=black)
![Static Badge](https://img.shields.io/badge/tailwind%20css%20-%20%2306B6D4?style=for-the-badge&logo=tailwindcss&labelColor=black)
![Static Badge](https://img.shields.io/badge/ESLint%20-%20%234B32C3?style=for-the-badge&logo=eslint&labelColor=black)
![Static Badge](https://img.shields.io/badge/prettier%20-%20%23F7B93E?style=for-the-badge&logo=prettier&labelColor=black)
![Static Badge](https://img.shields.io/badge/handlebars%20-%20%23000000?style=for-the-badge&logo=handlebarsdotjs&labelColor=black)

</div>

## Description 📚

Organize your trips and treks with JourneyJot! This application will allow users to log and track different trips or adventures as well as create a suggested packing list. This application will also give you the weather for where you are going so you can make sure you are prepared for anything Mother Nature throws your way. The user can refer to the trips from the past and remember the details, favorites stops and great memories.

## Table of Contents

-   [User-Story](#user-story)
-   [Acceptance-Criteria](#acceptance-criteria)
-   [Installation](#installation-📋)
-   [Usage](#usage-🏁)
-   [Demonstration](#demonstration)
-   [Author](#author-👋🏽)

## User Story

AS A traveler: I WANT to prepare for a trip with what to pack, the weather and previous trip experience SO THAT I can be prepared and keep my trip details all in one place.

## Installation 📋

Users can clone the repository to a local machine by running `git clone https://github.com/Umbelth94/JourneyJot.git`

Once the repo is set the user can continue to install all the dependacies needed by running `npm install`. Log into mysql by using `mysql -u root -p` and typying your password. Once you are logged in, set up the databases by running `SOURCE db/schema.sql` and run the seeds by running `npm run seed`.

Once all the initial start up commands are completed, the user can start the server by running `node server.js`.

## Usage 🏁

This project is deployed [here](https://journey-jot-decc05f3600a.herokuapp.com/) using Heroku.

## Authors 👋🏽

Megan Schneider | [schneidsmc](https://github.com/schneidsmc)
Sergio Ardila | [Stroyer210](https://github.com/Stroyer210)
Travis Umbel | [Umbelth94](https://github.com/Umbelth94)

# JourneyJot

An app for helping a user plan out a trip and share their experiences!

NPM Packages:

-   [WeatherJS](https://www.npmjs.com/package/weather-js)
-   [Mysql2](https://www.npmjs.com/package/mysql2)
-   [Sequelize](https://www.npmjs.com/package/sequelize)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [express](https://expressjs.com/)
-   [express-session](https://www.npmjs.com/package/express-session)
-   [express-handlebars](https://www.npmjs.com/package/express-handlebars)
-   [husky](https://typicode.github.io/husky/)
-   [eslint](https://eslint.org/)
-   [prettier](https://prettier.io/docs/en/install)

# TO DO
