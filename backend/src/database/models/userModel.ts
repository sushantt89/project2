import { Table, Column, Model, DataType, PrimaryKey } from "sequelize-typescript";

// Define the 'User' model which maps to the 'users' table in the database
@Table({
    tableName: "users", // The name of the table in the database (convention -> lowercase and plural)
    modelName: "User",  // The name of the model and we use this name in our code. to refer to users table (convention -> Pascal case and singular)
    timestamps: true,   // Automatically adds 'createdAt' and 'updatedAt' fields to the table
})
class User extends Model {
    // Define the 'id' column as the primary key
    @PrimaryKey
    @Column({
        type: DataType.UUID,        // The data type is UUID (Universally Unique Identifier)
        defaultValue: DataType.UUIDV4, // Automatically generate a UUID v4 value for new records
    })
    declare id: string; // mathi ko column lai Declare as 'id' as a string property

    // Define the 'username' column
    @Column({
        type: DataType.STRING,
    })
    declare username: string;

    // Define the 'email' column
    @Column({
        type: DataType.STRING,
    })
    declare email: string;

    @Column({
        type: DataType.ENUM('customer', 'admin'),
        defaultValue: 'customer'
    })
    declare role: string;
    // Define the 'password' column
    @Column({
        type: DataType.STRING,
    })
    declare password: string;
}

export default User;

/* 
# Notes:
-> ani aba project run garna sat if there is no users table in db then it creates a new one.
-> @ lai decorators vanxa ani yo use garda error auxa. yo solve garna tsconfig.json ma you duita garna parxa:
"experimentalDecorators": true,                   
"emitDecoratorMetadata": true,      
-> And sequelize-typescript ko kunai kura haru is dependend on another package called reflect-metadata
*/