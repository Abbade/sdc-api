import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors())
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.log(err);
    return response?.status(400)?.json({
      message: JSON.stringify(err.message),
    });
  }

  return response?.status(500)?.json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.get('/', (request, response) => {
  return response.json({
    message: 'Hello World',
  });
});

app.listen(process.env.PORT || 80 , () => console.log('Server is running'));
