import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class authenticationController {
    public static authenticationToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        console.log('Authorization Header:', authHeader); // For debugging

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided or incorrectly formatted' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token part
console.log({token})
        if (!token) {
            return res.status(401).json({ message: 'Token is missing or incorrectly formatted' });
        }

        jwt.verify(token, 'secret-key', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            // req.user = user; // Attach user information to the request object
            next(); // Proceed to the next middleware or route handler
        });
    }
}

export default authenticationController;
