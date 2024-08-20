import { Request, Response } from "express";
import Category from "../database/models/categoryModel";
import { StatusCodes } from "http-status-codes";
class categoryContoller {
    async addCategory(req: Request, res: Response): Promise<void> {
        const { name } = req.body;
        console.log({categoryBody:req.body})
        const newCategory = await Category.create({ name });
        res.status(StatusCodes.CREATED).json({
            message: "Category created successfully",
            data: newCategory
        })

    }

    async getCategories(req: Request, res: Response): Promise<void> {
        const result = await Category.findAll();
        res.json({
            message: "All categories fetched successfully",
            data: result
        })
    }
}
export default new categoryContoller;