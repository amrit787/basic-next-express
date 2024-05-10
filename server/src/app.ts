import express, { Express, NextFunction, Request, Response } from 'express';

import routes from './routes';
import ApiError from './lib/api-error';
import { errorConverter, errorHandler } from './controllers/error-controller';

const app: Express = express();

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'this route does not exists on this server'));
});
// app.use(errorConverter)
app.use(errorConverter, errorHandler);

export default app;
