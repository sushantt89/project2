"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    db: 'project2database',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 10000
    }
};
exports.default = dbConfig;
//Explanation:
// Host: This is like the address where your database lives. If it's 'localhost', it means the database is on the same computer as your application. Otherwise, it would be the network address where your database server is located.
// User: Just like how you have a username for your computer or email, this is the username your application will use to talk to the database. For example, 'root' is a common username in databases.
// Password: This is like the secret password that goes with the username. It's used to make sure only your application can access your database, keeping your data safe.
// DB: Short for "database", this is the specific collection of data your application will work with. It's like a file cabinet where your information is stored, such as 'project2database'.
// Dialect: This tells your application what type of database it's talking to. It's like speaking different languages—your application needs to know if it's talking to MySQL (like MySQL Workbench), PostgreSQL, or SQLite (like a simple file-based database).
// Pool (Connection Pooling): Imagine a swimming pool where each swimmer is a connection to your database. These settings decide how many swimmers (connections) can be in the pool and how long they can wait or rest:
// Max Connections: The maximum number of swimmers (connections) allowed in the pool at the same time.
// Min Connections: The minimum number of swimmers (connections) that should always be ready, even if no one is using them right now (idle connections).
// Idle Time: How long a swimmer (connection) can sit in the pool doing nothing before they are sent home (released from the pool).
// Acquire Time: How long your application is willing to wait for a new swimmer (connection) to join the pool before giving up.
