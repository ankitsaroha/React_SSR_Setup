// import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'babel-polyfill';
import express from 'express';
import store from './src/stores/store';
import ServerSide from './src/ServerSide';

// Express app setup
const app = express();

// logger
app.use(logger('dev'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookie parser
app.use(cookieParser());

// serve static files from 'public'
app.use(express.static('public'));

function handleRender(req, res) {
  ServerSide(req.path, store).then((serverHTML) => {
    res.send(serverHTML);
  });
}

app.use(handleRender);

export default app;
