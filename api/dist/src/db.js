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
const Carrier_1 = require("./models/Carrier");
const Review_1 = require("./models/Review");
const Travel_1 = require("./models/Travel");
const User_1 = require("./models/User");
const User_Reg_1 = require("./models/User_Reg");
const Vehicle_1 = require("./models/Vehicle");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
config_1.default;
exports.sequelize = process.env.NODE_ENV === "production" ?
    new sequelize_typescript_1.Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
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
        database: config_1.default.dbName,
        password: config_1.default.dbPassword,
        username: config_1.default.dbUser,
        storage: ':memory:',
        models: [__dirname + '/models'],
    });
User_Reg_1.User_Reg.hasOne(User_1.User);
User_1.User.belongsTo(User_Reg_1.User_Reg);
User_Reg_1.User_Reg.hasOne(Carrier_1.Carrier);
Carrier_1.Carrier.belongsTo(User_Reg_1.User_Reg);
Carrier_1.Carrier.hasOne(Vehicle_1.Vehicle);
Vehicle_1.Vehicle.belongsTo(Carrier_1.Carrier);
Travel_1.Travel.hasOne(Review_1.Review);
Review_1.Review.belongsTo(Travel_1.Travel);
User_1.User.hasMany(Travel_1.Travel);
Travel_1.Travel.belongsTo(User_1.User);
Carrier_1.Carrier.hasMany(Travel_1.Travel);
Travel_1.Travel.belongsTo(Carrier_1.Carrier);
