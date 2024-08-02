import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import User from '../database/models/userModel';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

interface authRequestType extends Request {
    user?: {
        id: string,
        username: string,
        email: string,
    }
}
class AuthController {
    public static async registerUser(req: Request, res: Response): Promise<void> { // class lai instantiate garnu parxa ani tyo instance lai export garera balla you can access its method any where but if public static use garey you do not need to instatiate it.
        const { username, email, password, role } = req.body;
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
            password: bcrypt.hashSync(password, 12),
            role: role
        })

        res.json({
            message: "User registerd successfully!",
            status: StatusCodes.CREATED
        })
    }

    //get all user
    public static async getAllUser(req: authRequestType, res: Response): Promise<void> {
        const allUser = await User.findAll();
        const authenticatedUser = req.user;
        if (allUser.length <= 0) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "No users found",
                status: StatusCodes.NOT_FOUND
            })
            return;
        }
        res.status(StatusCodes.OK).json({
            message: `${allUser.length} ${allUser.length > 1 ? 'Users' : 'User'} found`,
            status: StatusCodes.OK,
            authenticatedUser,
            data: allUser
        })
    }

    public static async userLogin(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please enter email and password.",
                status: StatusCodes.BAD_REQUEST
            })
            return;
        }

        const [data] = await User.findAll({
            where: {
                email: email
            }
        })

        if (!data) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found with given email",
                status: StatusCodes.NOT_FOUND
            })
            return;
        }

        const isPasswordMatched = bcrypt.compareSync(password, data.password);
        if (!isPasswordMatched) {
            res.status(StatusCodes.FORBIDDEN).json({
                message: "Email or password incorrect",
                status: StatusCodes.FORBIDDEN
            })
            return;
        }

        const token = jwt.sign({ id: data.id, username: data.username, email: data.email, role: data.role }, "secret-key", { expiresIn: '1h' })

        res.status(StatusCodes.OK).json({
            message: "Login Successful",
            data: token
        })

    }
}
export default AuthController;