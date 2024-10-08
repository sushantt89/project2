import { UUID } from "sequelize";
import { Model, Table, Column, DataType, PrimaryKey } from "sequelize-typescript";

@Table({
    tableName: "carts",
    modelName: "Cart",
    timestamps: true
})


class Cart extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.INTEGER,
    })
    declare quantity: number

}

export default Cart;