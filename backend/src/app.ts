import express, { Application } from 'express'
import * as dotenv from 'dotenv';
import userRouter from './routes/userRoutes';
import statusCheckRouter from './routes/statusCheck';
import uploadPhotoRouter from './routes/uploadPhotoRoutes';
import addProudctRouter from './routes/productRoutes';
import Seeder from './services/adminSeeder';
import categoryRouter from './routes/categoryRoutes';

dotenv.config();

require('./database/connection')
const app: Application = express();
const PORT: number = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Run the adminSeeder only once at startup
Seeder.adminSeeder();
app.use("", userRouter);
app.use("", statusCheckRouter);
app.use("", uploadPhotoRouter);
app.use("", addProudctRouter);
app.use("", categoryRouter);




app.listen(PORT, () => {
    console.log(`server is running in port : ${PORT}`)

})