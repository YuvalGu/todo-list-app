# TODO List App

This is our last assignment in WEB development:<br />
We created a website that helps any team to create tasks, edit or delete them.<br />
Through the assigment we've been experienced with nodeJS, ejs files, express and mysql packages.<br />
This assigment was coded as WEB assignment on the 1nd semester of our 3st year Information Systems at College of Law & Business.<br />


# Prerequisites

- git
- chrome
- node
- npm
- MySQL Workbench

# Installation

- **In Terminal**
 1. git clone https://github.com/YuvalGu/todo-list-app.git<br />
  2. cd todo-list-app<br />
  3. npm install<br />
- **In SQL Workbench**<br /><br />
  4. create new connection (or open existing one)<br />
  5. create new schema name 'todo-list-app'<br />
  6. open Query tab and execute the script:<br />
  ```bash
  CREATE SCHEMA `todo-list-app`;
  ALTER USER <user>@'localhost' IDENTIFIED WITH mysql_native_password BY <password>;
  CREATE TABLE `todo-list-app`.`tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `team_member` VARCHAR(45) NOT NULL,
  `priority` ENUM('High', 'Middle', 'Low') NOT NULL,
  `is_finished` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  ```
  <br />
- **In Project**<br /><br />
  7. open .env file and insert DB conection environment variables (DB_USER, DB_PASSWORD, DB_PORT and also the rest if needed).<br /><br />
- **Back to Terminal**<br /><br />
  8. node index.js<br /><br />
- **In Chrome**<br /><br />
  9. go to http://localhost:3000
