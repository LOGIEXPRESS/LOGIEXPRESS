//generar nuestra conexion con la db!
require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
import config from '../lib/config';
import { Carrier } from './models/Carrier';
import { Review } from './models/Review';
import { Travel } from './models/Travel';
import { User } from './models/User';
import { User_Reg } from './models/User_Reg';
import { Vehicle } from './models/Vehicle';

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;
   
config; 
export const sequelize = process.env.NODE_ENV === "production"?
new Sequelize({
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
:new Sequelize({
	dialect: 'postgres',
	database: config.dbName,
	password: config.dbPassword,
	username: config.dbUser,
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

