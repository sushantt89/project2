import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../database/models/productModel";

class productController {
    public static async addProducts(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, price } = req.body;

            if (!name || !description || !price) {
                 res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Please add all required details!",
                    status: StatusCodes.BAD_REQUEST,
                });
            }

            if (!req.file) {
                 res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Please upload a product image!",
                    status: StatusCodes.BAD_REQUEST,
                });
            }

            const { path } = req.file as Express.Multer.File;

            const newProduct = await Product.create({
                name,
                description,
                price,
                photoURL: path,
            });

            res.status(StatusCodes.CREATED).json({
                message: "Product added successfully!",
                status: StatusCodes.CREATED,
                data: newProduct,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "An error occurred while adding the product.",
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    error: error.message,
                });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "An unknown error occurred.",
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                });
            }
        }
    }
}

export default productController;
