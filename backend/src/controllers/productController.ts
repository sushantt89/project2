import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Product from "../database/models/productModel";
import { authRequestType } from "../middleware/authentication";
import User from "../database/models/userModel";
import Category from "../database/models/categoryModel";


class productController {
    public static async addProducts(req: authRequestType, res: Response): Promise<void> {
        try {
            const { name, description, price, stockQty, category } = req.body;
            const userId = req.user?.id;
            console.log({ body: req.body })
            console.log({ userId })

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
                stockQty,
                categoryId: category,
                photoURL: path,
                userId: userId,
            });
            console.log({ newProduct })
            res.status(StatusCodes.CREATED).json({
                message: "Product added successfully!",
                status: StatusCodes.CREATED,
                data: newProduct,
                user: req.user,

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

    // get product by ID:
    public static async getProductByID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const result = await Product.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email', 'username']
                }

            ]
        });
        if (result === null) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Product not found"
            })
            return;
        }
        res.status(StatusCodes.OK).json({
            message: `product fetched successfully`,
            data: result
        })

    }

    // get all products:
    public static async getAllProducts(req: Request, res: Response): Promise<void> {


        const result = await Product.findAll({
            include: [{
                model: Category,
                attributes: ['name']
            }
            ]
        });

        res.status(StatusCodes.OK).json({
            message: `All products fetched successfully`,
            count: result.length,
            data: result
        })

    }

    // delete a products:
    public static async deleteProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const productFound = await Product.findAll({
            where: {
                id: id
            }
        })
        if (productFound.length === 0) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "product not found"
            })
            return;
        }

        const result = await Product.destroy({
            where: {
                id: id
            }
        })
        res.status(StatusCodes.OK).json({
            message: `Product deleted successfully`,
        })

    }

    public static async updateProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, description, price, stockQty } = req.body;

        // Initialize updated fields
        const updatedFields: Partial<Product> = {};

        // Handle file upload
        if (req.file) {
            const { path } = req.file as Express.Multer.File;
            updatedFields.photoURL = path;
        }
        if (name) updatedFields.name = name;
        if (description) updatedFields.description = description;
        if (price) updatedFields.price = price;
        if (stockQty) updatedFields.stockQty = stockQty;

        const productFound = await Product.findOne({ where: { id } });
        if (!productFound) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
            return;
        }


        // Update the product
        const [affectedRows] = await Product.update(updatedFields, { where: { id } });
        console.log("Affected rows:", affectedRows);

        if (affectedRows === 0) {
            // No rows were affected, so no changes were made
            res.status(StatusCodes.NO_CONTENT).json({
                message: "No changes were made"
            });
            return;
        }

        // Fetch the updated product
        const updatedProduct = await Product.findOne({ where: { id } });

        // Respond with success and the updated product
        res.status(StatusCodes.OK).json({
            message: "Product updated successfully",
            data: updatedProduct
        });
    }




}

export default productController;
