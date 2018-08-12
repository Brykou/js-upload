# File upload

## Stack

### WWW

- ReactJS (Setup with [create-react-app](https://github.com/facebook/create-react-app))
- [Redux](https://redux.js.org/) for state management
- [Axios](https://github.com/axios/axios) for HTTP requests

### Server

- NodeJS server using [ExpressJS](https://expressjs.com/fr/)
- [LowDB](https://github.com/typicode/lowdb) for data persistence

## How to run ?

Start the server. Note that you can change server configuration in `server/config.js`. By default, server run on port 3001.

    cd server
    npm install
    npm run start

Start the client. If you changed server configuration, go to `config/webpack.config.dev.js` to update `publicUrl`. This URL is used to request API endpoint and static server.

    cd wwww
    npm install
    npm run start

Access to http://localhost:3000 to see the app.
