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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { Op } = require("sequelize");
const uuidv4_1 = require("uuidv4");
const Travel_1 = require("../models/Travel");
const User_1 = require("../models/User");
const User_Reg_1 = require("../models/User_Reg");
const Carrier_1 = require("../models/Carrier");
const ServiceAlert_1 = require("../models/ServiceAlert");
const router = (0, express_1.Router)();
router.get('/allan', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Allan Torres');
}));
function getDistanciaMetros(origen, destino) {
    var newOrigen = origen.split("/");
    var newDestino = destino.split("/");
    var lat1 = newOrigen[0];
    var lon1 = newOrigen[1];
    var lat2 = newDestino[0];
    var lon2 = newDestino[1];
    var rad = function (x) { return x * Math.PI / 180; };
    var R = 6378.137; //Radio de la tierra en km 
    var dLat = rad(parseFloat(lat2) - parseFloat(lat1));
    var dLong = rad(parseFloat(lon2) - parseFloat(lon1));
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(parseFloat(lat1))) *
        Math.cos(rad(parseFloat(lat2))) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //aquí obtienes la distancia en metros por la conversion 1Km =1000m
    var d = R * c * 1000;
    return d / 1000;
}
router.get('/actualTravel', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (id === '') {
        return res.send('El id no puede estar vacio');
    }
    let carrier = yield Carrier_1.Carrier.findAll({
        where: {
            idUserReg: id
        }
    });
    if (!carrier.length) {
        let user = yield User_1.User.findAll({
            where: {
                idUserReg: id
            }
        });
        let travel = yield Travel_1.Travel.findAll({ where: {
                usaerId: user[0].id,
                finishedTravel: { [Op.eq]: null }
            } });
        if (!travel.length) {
            return res.send('Carrier not travels');
        }
        else
            res.send(travel);
    }
    else {
        let travel = yield Travel_1.Travel.findAll({ where: {
                carrierId: carrier[0].id,
                finishedTravel: { [Op.eq]: null }
            } });
        return res.send(travel);
        if (!travel.length) {
            return res.send('Carrier not travels');
        }
        else
            res.send(travel);
    }
}));
router.post('/calculatePrice', (req, res) => {
    //226.49013972673578
    //price 45298,0279
    try {
        console.log(req.body);
        const { origen, destino, weight } = req.body;
        // var destino= "-26.8082848,-65.2175903"
        // var origen= "-24.7821269,-65.4231976"
        // let weight= 20;
        let distance = getDistanciaMetros(origen, destino);
        const valor = 10; /// valor de tonelada por km recorrido
        let price = Math.round(valor * (weight * distance));
        res.send({ price });
    }
    catch (error) {
        console.log("Error", error);
    }
});
router.post('/requestTravel', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, orig, destination, weight, price, description, finishedTravel } = req.body;
    try {
        let TravelId = (0, uuidv4_1.uuid)();
        var newViaje = {
            id: TravelId,
            orig,
            destination,
            weight,
            price,
            description,
            userId: id,
            finishedTravel,
        };
        let traveles = yield Travel_1.Travel.create(newViaje);
        /* let vehicles = await Vehicle.findAll({
          where: {
            capacity: { [Op.or]: { [Op.eq]: weight, [Op.gt]: weight } }
          }
        })
        let obj = [];
        let tam = vehicles.length;
        for (let i = 0; i < tam; i++) {
          obj[i] =
          { TravelId: TravelId, CarrierId: vehicles[1].CarrierId }
        }
        let alertServices = await ServiceAlert.bulkCreate(obj); */
        /*   res.send(newViaje) */
        res.send({ id: TravelId });
    }
    catch (err) {
        next(err);
    }
}));
// usuario -> userId -> Travel -> id del viaje -> sin viajes 
router.post('/oneTravel', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    let getTravel = yield Travel_1.Travel.findAll({ where: { id: id } });
    let varUser = yield User_1.User.findAll({ where: { id: getTravel[0].userId }, include: [{ model: User_Reg_1.User_Reg }] });
    /*  let varUserReg = await User_Reg.findOne({ where: { id: varUser[0].idUserReg } }); */
    let varCarrier = yield Carrier_1.Carrier.findAll({ where: { id: getTravel[0].carrierId }, include: [{ model: User_Reg_1.User_Reg }] });
    const travelFullData = { travel: getTravel[0], user: varUser[0], carrier: varCarrier[0] };
    if (getTravel.length === 0) {
        return res.send('Travel not found');
    }
    else {
        return res.send(travelFullData);
    }
    /* res.send({varUser}) */
}));
router.get('/Travel', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Importante en el modelo de travel hay un error en declaración de la relacion con user User_Reg
        //hay que corregir que es de tipo string 
        /* let travel = await Travel.findAll() */
        const travel = yield Travel_1.Travel.findAll({ where: { carrierId: { [Op.eq]: null } } });
        // res.send(travel);
        if (travel.length > 0) {
            let tam = travel.length;
            var travelFullData = [];
            for (let i = 0; i < tam; i++) {
                let varUser = yield User_1.User.findAll({ where: { id: travel[i].userId } });
                let varUserReg = yield User_Reg_1.User_Reg.findOne({ where: { id: varUser[0].idUserReg } });
                travelFullData[i] = { travel: travel[i], user: varUser[0], userReg: varUserReg };
            }
            return res.send(travelFullData);
        }
        //res.send('data not found')
        //por consola me aparece:"Executing (default): SELECT "id", "ducumentoIdentidad", "eMail", "ubicacion", "cel", "tel", "fotoPerfil", "medioPago", "name", "lastName", "paswword", "terminosCondiciones", "createdAt", "updatedAt" FROM "Users" AS "User";"
        //no pude corregirlo!!
    }
    catch (err) {
        next(err);
    }
}));
router.post('/requestAlert', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        let alert = yield ServiceAlert_1.ServiceAlert.findAll({ where: { CarrierId: id } });
        let tamAlert = alert.length;
        let notification;
        if (tamAlert > 0) {
            notification = true;
        }
        else {
            notification = false;
        }
        res.send({ notification });
    }
    catch (err) {
        next(err);
    }
}));
router.post('/waitTravel', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    let getTravel = yield Travel_1.Travel.findAll({ where: { userId: id, carrierId: { [Op.eq]: null }, finishedTravel: { [Op.is]: null } } });
    if (getTravel.length === 0)
        res.send({ data: 0 });
    else
        res.send(getTravel);
}));
router.put('/acceptTravel', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //id=es el Id de travel que viene desde el front
    const { userId, carrierId, id } = req.body;
    const upTravel = yield Travel_1.Travel.update({ carrierId: carrierId }, { where: { id: id } });
    if (upTravel[0] === 1) {
        let getUser = yield User_1.User.findAll({ where: { id: userId } });
        let getUserReg = yield User_Reg_1.User_Reg.findAll({ where: { id: getUser[0].idUserReg } });
        let dataFull = {
            User: getUser,
            User_Reg: getUserReg
        };
        res.send(dataFull);
    }
    else
        res.send('id travel incorrecto');
}));
router.get('/userTravel/:idRole', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRole } = req.params;
    console.log("ESTO ES REQUEST PARAM", req.params);
    try {
        let userTravel = yield Travel_1.Travel.findAll({
            where: {
                [Op.and]: [{ userId: idRole }, { finishedTravel: null }],
            }
        });
        if (!userTravel.length) {
            return res.send('user sin travel');
        }
        res.json({ menssage: 'user travel', payload: userTravel });
    }
    catch (e) {
        next(e);
    }
}));
router.get('/TravelOn/:idRole', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRole } = req.params;
    console.log("ESTO ES REQUEST PARAM", req.params);
    try {
        let userTravel = yield Travel_1.Travel.findAll({
            where: {
                [Op.and]: [{ userId: idRole }, { finishedTravel: 'process' }],
            }
        });
        console.log("ESTE ES EL VIAJE ACTUAL", userTravel);
        if (!userTravel.length) {
            return res.send('user sin travel');
        }
        res.json({ menssage: 'user travel', payload: userTravel });
    }
    catch (e) {
        next(e);
    }
}));
router.post('/confirmTravel', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, id } = req.body;
    try {
        let confirm = yield Travel_1.Travel.update({ finishedTravel: 'process' }, { where: { id: id, userId: { [Op.eq]: userId } } });
        console.log("ESTO DEVUELVE CONFIRM TRAVEL,", confirm);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
