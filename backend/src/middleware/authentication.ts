import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export interface authRequestType extends Request {
    user?: {
        id: string,
        username: string,
        email: string,
        role: string
    }
}

export enum Role {
    Admin = "admin",
    Customer = "customer"
}

class Authentication {
    authenticationToken(req: authRequestType, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        console.log('Authorization Header:', authHeader); // For debugging

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided or incorrectly formatted' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token part
        console.log({ token })
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or incorrectly formatted' });
        }

        jwt.verify(token, 'secret-key', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            console.log({ decoded })

            req.user = decoded as { id: string, username: string, email: string, role: string }; // Attach user information to the request object
            next(); // Proceed to the next middleware or route handler
        });
    }

    restrictTo(...roles: Role[]) {
        return (req: authRequestType, res: Response, next: NextFunction) => {
            const userRole = req.user?.role as Role;
            if (!roles.includes(userRole)) {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: "You don't have permission",
                })
                return;
            }
            next();

        }
    }
}

export default new Authentication;
