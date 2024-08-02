import { Request, Response, NextFunction } from "express";
import User from "../database/models/userModel";
import bcrypt from 'bcrypt';

class Seeder {
    public static async adminSeeder(req?: Request, res?: Response, next?: NextFunction): Promise<void> {
        try {
            const [data] = await User.findAll({
                where: {
                    email: "admin@gmail.com"
                }
            });

            if (!data) {
                await User.create({
                    username: "admin",
                    email: "admin@gmail.com",
                    password: bcrypt.hashSync("admin", 12),
                    role: "admin"
                });
                console.log("admin credentials seeded successfully");
            }
        } catch (error) {
            console.error("Error seeding admin credentials:", error);
        }
        if (next) {
            next();
        }
    }
}

export default Seeder;
