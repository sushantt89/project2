import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler = (fn: Function) => {
    return (req: Request, res: Response) => {
        fn(req, res).catch((err: Error) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal Server error",
                errorMessage: err.message
            })
        })
    }
}
export default errorHandler