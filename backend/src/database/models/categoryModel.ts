import { DataType, Model, Table, Column, PrimaryKey } from "sequelize-typescript";

@Table({
    tableName: "categories",
    modelName: "Category",
    timestamps: true
})


class Category extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING
    })
    declare name: string;

}

export default Category;