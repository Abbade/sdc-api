import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { routes } from './routes';
import productRoutes from "./modules/product/ProductRoutes";
import unitOfMeasuresRoutes from "./modules/unitOfMeasure/UnitOfMeasureRoutes";
import VariableTypeRoutes from "./modules/variableType/VariableTypeRoutes";
import VariableTypeValueRoutes from "./modules/variableTypeValue/VariableTypeValueRoutes";
const app = express();

app.use(express.json());
app.use(cors())
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  if (err instanceof Error) {
    console.log(err);
    return response?.status(400)?.json({
      message: err.message,
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


app.use("/products", productRoutes);
app.use("/unitofmeasures", unitOfMeasuresRoutes);
app.use("/variableTypes", VariableTypeRoutes);
app.use("/variableTypeValues", VariableTypeValueRoutes);


app.listen(process.env.PORT || 80 , () => console.log('Server is running'));
