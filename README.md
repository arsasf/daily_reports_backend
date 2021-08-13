<h1 align='center'>Employee Membership Daily Report RESTFull API </h1>
  <p align="center">
    <a href="https://github.com/arsasf/daily_reports_backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/arsasf/daily_reports_backend/pulls">Request Feature</a>
  </p>

## About The Project

Employees Membership Daily Report a website that displays daily reports of employee membership status across decades.

## Built With

[Node Js]()
[Express Js]()

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name cinemars_ticket_booking, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/14947284/TzJphKMR)
9. Type `npm run dev`

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```sh
DB_PORT=YOUR_PORT
DB_HOST=YOUR_LOCALHOST
DB_USER=YOUR_USER
DB_PASS=YOUR_PASS
DB_DATABASES=YOUR_DB_NAME
SMTP_EMAIL=YOUR_EMAIL
SMTP_PASSWORD=YOUR_PASS_EMAIL
```

## Feature

Employee

1. CRUD Profile
2. Upload Profile Image
3. Change Password
4. Register & Login
5. View Chart
6. View & Filter Daily Report
7. Viem other employees

Manager

1. CRUD Profile
2. Upload Profile Image
3. Change Password
4. Register & Login
5. View Chart
6. View & Filter Daily Report
7. Viem other employees
8. CRUD Membership Daily Report

## Acknowledgements

- [Express Js](https://expressjs.org/)
- [ENV](https://www.npmjs.com/package/dotenv)
- [Redis]()
- [Node Mailer]()
- [EJS]()
- [Node Js]()
- [Midtrans]()

## License

© [Aulia Safitri](https://github.com/arsasf/)
