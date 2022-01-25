"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const Travel_1 = require("./src/models/Travel");
const db_1 = require("./src/db");
const uuidv4_1 = require("uuidv4");
const { Op } = require("sequelize");
const server = require('http').createServer(app_1.default);
const io = require('socket.io')(server, { cors: { origin: "*" } });
///begin Sokets
io.on("connection", (socket) => {
    console.log("User conneted: " + socket.id);
    socket.on("message", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.log(data);
        const { id, orig, destination, weight, price, description } = data;
        /* const requestTravel = await Travel.findAll() */
        const requestTravel = yield Travel_1.Travel.findAll({ where: { userId: id, carrierId: { [Op.eq]: null } } });
        /* console.log("ESTO ES REQUEST TRAVEL", requestTravel[0]?.carrierId ) */
        if (requestTravel.length === 0 || ((_a = requestTravel[0]) === null || _a === void 0 ? void 0 : _a.carrierId) !== null) {
            let TravelId = (0, uuidv4_1.uuid)();
            var newViaje = {
                id: TravelId,
                orig,
                destination,
                weight,
                price,
                description,
                userId: id
            };
            let traveles = yield Travel_1.Travel.create(newViaje);
            // console.log('traveles: ',traveles);
            socket.broadcast.emit('message', newViaje);
            let travel = yield Travel_1.Travel.findAll();
            socket.broadcast.emit('Travel', travel);
            callback({
                status: TravelId
            });
        }
        else {
            console.log("ESTO ES,", requestTravel[0].id);
            callback({
                status: ["Ya tiene un viaje en proceso", requestTravel[0].id]
            });
        }
    }));
    socket.on("response", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data);
        const upTravel = yield Travel_1.Travel.update({ carrierId: data.carrierId }, { where: { userId: data.userId, carrierId: { [Op.eq]: null } } });
        socket.broadcast.emit('response', data);
    }));
    socket.on("delete", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Esto es lo que se debe borrar', data);
        const deltTravel = yield Travel_1.Travel.destroy({ where: { id: data.id } });
    }));
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});
////end sokets
db_1.sequelize
    .sync({ force: false, logging: false })
    // .then(async () => {
    // 	// await resApiUsers()
    // })
    .then(() => {
    console.log('base de datos conectada! :D');
    server.listen(process.env.PORT || 3001, function () {
        console.log('App is listening on port 3001!');
    });
})
    .catch((err) => console.error(err));
