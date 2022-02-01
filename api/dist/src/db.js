"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
//generar nuestra conexion con la db!
require('dotenv').config();
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("../lib/config"));
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
config_1.default;
exports.sequelize = process.env.NODE_ENV === "production" ?
    new sequelize_typescript_1.Sequelize({
        database: "d3nem1qloocqg",
        dialect: "postgres",
        host: 'ec2-3-225-41-234.compute-1.amazonaws.com',
        port: 5432,
        username: "euhhnlvlorbgaz",
        password: "b9b70900233f499937ea603bc58f8340bd6aa51cf0b0038889526a2a3845ed67",
        models: [__dirname + '/models'],
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
                require: true,
                // Ref.: https://github.com/brianc/node-postgres/issues/2009
                rejectUnauthorized: false,
            },
            keepAlive: true,
        },
        ssl: true,
    })
    : new sequelize_typescript_1.Sequelize({
        dialect: 'postgres',
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USER,
        storage: ':memory:',
        models: [__dirname + '/models'],
    });
// User_Reg.hasOne(User)
// User.belongsTo(User_Reg)
// User_Reg.hasOne(Carrier)
// Carrier.belongsTo(User_Reg)
// Carrier.hasOne(Vehicle)
// Vehicle.belongsTo(Carrier)
// Travel.hasOne(Review)
// Review.belongsTo(Travel)
// User.hasMany(Travel);
// Travel.belongsTo(User);
// Carrier.hasMany(Travel)
// Travel.belongsTo(Carrier)
