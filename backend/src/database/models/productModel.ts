import { Table, Column, DataType, Model, PrimaryKey } from "sequelize-typescript";

@Table({
    tableName: "products",
    modelName: "Product",
    timestamps: true
})
class Product extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
    })
    declare description: string;

    @Column({
        type: DataType.FLOAT, // Corrected data type for price
    })
    declare price: number;

    @Column({
        type: DataType.TEXT, // Changed to TEXT to handle long URLs
    })
    declare photoURL: string;
}

export default Product;
