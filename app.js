import express from 'express';
import createError from 'http-errors';
// import path from 'path';
// import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import validator from 'express-validator';

import routes from './routes';
import connect2MongoDB from './utils/mongo';
import './utils/passport';

const app = express();

app.use(cors());
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

connect2MongoDB();

app.use(routes);

app.use((req, res, next) => {
  next(createError(404));
});

/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ status: err.status, message: err.message });
});

export default app;
