import express, { Request, Response, Application } from 'express'
import { StatusCodes } from 'http-status-codes'
require('./model/index')
const app: Application = express();
const PORT: number = 9000;

app.use(express.json())

app.get("/status", (req: Request, res: Response) => {
    res.json({
        message: "Server is Running",
        status: StatusCodes.OK
    })



})

app.listen(PORT, () => {
    console.log(`server is running in port : ${PORT}`)
})