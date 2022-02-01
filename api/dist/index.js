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
const User_1 = require("./src/models/User");
const User_Reg_1 = require("./src/models/User_Reg");
const Carrier_1 = require("./src/models/Carrier");
const db_1 = require("./src/db");
const uuidv4_1 = require("uuidv4");
const { Op } = require("sequelize");
const server = require('http').createServer(app_1.default);
const io = require('socket.io')(server, { cors: { origin: "*" } });
///begin Sokets
io.on("connection", (socket) => {
    console.log("User conneted: " + socket.id);
    ///codigo de chat    
    //en este sockets creamos una sala solo para el User y Carrier que partician
    //en un Travel, recibiendo por el parametro data id de la tabla travel
    //creando un room con el nombre del id recibido paa que sea unico
    socket.on("join_room", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        //Socket join es el que se encarga de drear el room  
        socket.join(data);
        //en la variable sizeRoom tenemos la cantidad de personas que estan conectadas 
        //en esta sala, con esta variabel sabremos si ambos estan conectados
        var sizeRoom = io.sockets.adapter.rooms.get(data);
        console.log(sizeRoom.size);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
        // aqui me cree unos datos como si fuera el redux para controlar el chat 
        let traveles = yield Travel_1.Travel.findAll({ where: { carrierId: { [Op.not]: null } } });
        let Users = yield User_1.User.findAll({ where: { id: traveles[0].userId } });
        let Us = yield User_Reg_1.User_Reg.findAll({ where: { id: Users[0].idUserReg } });
        let Carriers = yield Carrier_1.Carrier.findAll({ where: { id: traveles[0].carrierId } });
        let Car = yield User_Reg_1.User_Reg.findAll({ where: { id: Carriers[0].idUserReg } });
        let obj = { travelId: traveles[0].id, Us, Car };
        /////////
        // por esta función callback podemos devolver información al front
        callback({
            status: obj
        });
    }));
    // A traves de este socket se recibe y se envia la información
    socket.on("send_message", (data, callback) => {
        //esn esta variable tenemos cuantas personas hay en la sala,
        //que deberian ser 2 para que esten tanto el carrier como el User
        var sizeRoom = io.sockets.adapter.rooms.get(data.room);
        console.log(sizeRoom.size);
        socket.to(data.room).emit("receive_message", data);
        //si el numero de participantes es 1 devolvemos un mensaje de Offline user
        //que nos servira para validar los mensaje en el front.
        if (sizeRoom.size === 1)
            var status = 'offline user';
        else
            var status = '';
        callback({
            status: status
        });
    });
    /////
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
        const dateCarrier = yield Carrier_1.Carrier.findAll({ where: { id: data.carrierId } });
        const userReg = yield User_Reg_1.User_Reg.findAll({ where: { id: dateCarrier[0].idUserReg } });
        const resp = {
            userReg: userReg[0],
            dateCarrier: dateCarrier[0]
        };
        let upTravel = yield Travel_1.Travel.update({ carrierId: data.carrierId }, { where: { userId: data.userId, carrierId: { [Op.eq]: null } }, returning: true });
        /* let upTravel2 = await Travel.update({ finishedTravel: "process" } , { where: { userId: data.userId, carrierId:  data.carrierId } }); */
        console.log("Esto es upTravel", upTravel);
        /*    const upTravel2 = await Travel.update({ finishedTravel: "process"} , { where: { userId: data.userId, finishedTravel: { [Op.eq]: null } } }); */
        socket.broadcast.emit('response', resp);
    }));
    socket.on("delete", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Esto es lo que se debe borrar', data);
        const deltTravel = yield Travel_1.Travel.destroy({ where: { id: data.id } });
        callback({
            status: 'Viaje eliminado exitosamente'
        });
    }));
    socket.on("confirm_destination", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Esto es el viaje que hay que updatear', data);
        const confirm = yield Travel_1.Travel.update({ finishedTravel: 'at_destination' }, { where: { id: data } });
        callback({
            status: 'Viaje confirmado exitosamente'
        });
    }));
    socket.on("finished_travel", (data, callback) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Esto es el viaje que hay que updatear', data);
        const confirm = yield Travel_1.Travel.update({ finishedTravel: 'finish' }, { where: { id: data } });
        callback({
            status: 'Viaje confirmado exitosamente'
        });
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
