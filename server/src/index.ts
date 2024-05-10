import { Server } from 'http';

import prisma from './lib/prisma';
import config from './config/config';
import app from './app';

let server: Server;
prisma.$connect().then(() => {
  console.log('Connected to a database');
  server = app.listen(config.port, () => {
    console.log(
      'Server is up and running on : http://localhost:' + config.port
    );
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  // this error is thrown by zklib library and can't be caught anywhere
  // this error occurs when there is no attendance log
  if (
    error instanceof TypeError &&
    error.message === "Cannot read properties of null (reading 'subarray')"
  ) {
    return;
  }
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
