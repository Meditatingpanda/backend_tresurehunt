import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './routes/userRoute.js';
import * as colors from 'colors';
import connectMongoDB from './db/connectMongoDB.js';
import errorHandler from './middleware/error.js';
import helmet from 'helmet';



const port = process.env.PORT || 4000;
const app = express();

// middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors(
   {
    origin: 'https://frontend-tresurehunt.vercel.app',
   }
));
app.use(express.json());


// routes
app.use('/api', userRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port http://localhost:${port}/`.cyan);
  connectMongoDB();
}
);

export default app;

