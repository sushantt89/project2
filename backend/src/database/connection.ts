// Import necessary modules from sequelize-typescript and dotenv
import { ForeignKey, Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import Cart from "./models/cartModel";

// Load environment variables from the .env file
// This allows us to use variables like DB_NAME, DB_USERNAME, etc. in our code
dotenv.config();

// Create a new Sequelize instance to connect to the database
// The Sequelize instance needs configuration options to connect to the database
const sequelize = new Sequelize({
    database: process.env.DB_NAME,    // The name of the database to connect to, as specified in the .env file
    username: process.env.DB_USERNAME, // The username to connect to the database, as specified in the .env file
    password: process.env.DB_PASSWORD, // The password for the database user, as specified in the .env file
    host: process.env.DB_HOST,        // The host where the database server is running, as specified in the .env file
    port: Number(process.env.DB_PORT), // The port number where the database server is running, convert to a number from string
    dialect: 'mysql',                 // The type of database we are using, which is MySQL in this case
    models: [__dirname + "/models"],  // The path to the directory where Sequelize models are located, use absolute path adn __dirname -->  It provides the absolute path to the directory containing the currently executing script file.
});

// Authenticate and connect to the database
// This is to ensure that our connection configuration is correct and we can connect to the database
sequelize.authenticate()
    .then(() => {
        console.log("Database connected!"); // If connection is successful, print this message
    })
    .catch((err) => {
        console.log("Unable to connect to the database:", err.message); // If there is an error, print the error message
    });

// Sync the database (create tables if they do not exist, but do not drop existing tables)
// The force: false option means it will not drop tables if they already exist
sequelize.sync({ force: true }).then(() => {
    console.log("Database synced!"); // Print this message once synchronization is complete
});

User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' })

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' })


Cart.belongsTo(Product, { foreignKey: 'productId' })
Product.hasMany(Cart, { foreignKey: 'productId' })

Cart.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Cart, { foreignKey: 'userId' })
// Export the Sequelize instance so it can be used in other parts of the application
export default sequelize;
