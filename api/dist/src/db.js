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
