"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
require('./model/index');
const app = (0, express_1.default)();
const PORT = 9000;
app.use(express_1.default.json());
app.get("/status", (req, res) => {
    res.json({
        message: "Server is Running",
        status: http_status_codes_1.StatusCodes.OK
    });
});
app.listen(PORT, () => {
    console.log(`server is running in port : ${PORT}`);
});
