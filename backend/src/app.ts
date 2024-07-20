import express, { Request, Response, Application } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as dotenv from 'dotenv';
import userRouter from './routes/userRoutes';
import statusCheckRouter from './routes/statusCheck';
import uploadPhotoRouter from './routes/uploadPhotoRoutes';
import addProudctRouter from './routes/productRoutes';

dotenv.config();

require('./database/connection')
const app: Application = express();
const PORT: number = 4000;

app.use(express.json())
app.use("", userRouter);
app.use("", statusCheckRouter);
app.use("", uploadPhotoRouter);
app.use("", addProudctRouter);




app.listen(PORT, () => {
    console.log(`server is running in port : ${PORT}`)

})