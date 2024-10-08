import { Request, Response } from "express";
import { authRequestType } from "../middleware/authentication";
import { StatusCodes } from "http-status-codes";
import Cart from "../database/models/cartModel";

class cartController {
    async addToCart(req: authRequestType, res: Response): Promise<void> {
        const userId = req.user?.id
        const { quantity, productId } = req.body
        if (!quantity || !productId) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please provide quantity and productId"
            })
        }

        let cartItem = await Cart.findOne({
            where: {
                productId,
                userId
            }
        })

        if (cartItem) {
            cartItem.quantity += quantity
        }
    }
}