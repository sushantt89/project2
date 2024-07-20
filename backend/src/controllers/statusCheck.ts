import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class statusCheck {
    public static status(req: Request, res: Response) {
        if (res) {
            res.json({
                message: "Server is running!",
                status: StatusCodes.OK
            })
        }

    }
}

export default statusCheck;