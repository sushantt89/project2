import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import User from '../database/models/userModel';
class AuthController {
    public static async registerUser(req: Request, res: Response): Promise<void> { // class lai instantiate garnu parxa ani tyo instance lai export garera balla you can access its method any where but if public static use garey you do not need to instatiate it.
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.json({
                message: "Please provide username, email and password",
                status: StatusCodes.BAD_REQUEST
            })
            return;
        }

        await User.create({
            username,
            email,
            password,
        })

        res.json({
            message: "User registerd successfully!",
            status: StatusCodes.CREATED
        })
    }
}
export default AuthController;