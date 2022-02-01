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
const express_1 = require("express");
const uuidv4_1 = require("uuidv4");
const User_Reg_1 = require("../models/User_Reg");
const User_1 = require("../models/User");
const Carrier_1 = require("../models/Carrier");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const bcrypt = require("bcryptjs");
const router = (0, express_1.Router)();
router.get('/user/:user_Reg', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_Reg } = req.params;
    console.log("ESTO ESTA ENTRANDO", req.params);
    try {
        let objCarrier = yield Carrier_1.Carrier.findOne({ where: { idUserReg: user_Reg }, include: [{ model: User_Reg_1.User_Reg }] });
        console.log("AQUI", user_Reg);
        if (objCarrier) {
            return res.send(objCarrier);
        }
        res.send('data not found');
    }
    catch (err) {
        next(err);
    }
}));
router.post('/verifytoken', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        const dataUser = yield User_Reg_1.User_Reg.findByPk(decoded.id);
        if (dataUser) {
            const objUser = yield User_1.User.findOne({ where: { idUserReg: dataUser.id } });
            const objCarrier = yield Carrier_1.Carrier.findOne({ where: { idUserReg: dataUser.id } });
            const payload = {
                id: dataUser === null || dataUser === void 0 ? void 0 : dataUser.id,
                name: dataUser === null || dataUser === void 0 ? void 0 : dataUser.name,
                lastname: dataUser === null || dataUser === void 0 ? void 0 : dataUser.lastName,
                phone: dataUser === null || dataUser === void 0 ? void 0 : dataUser.phone,
                eMail: dataUser === null || dataUser === void 0 ? void 0 : dataUser.eMail,
                role: dataUser === null || dataUser === void 0 ? void 0 : dataUser.role,
                photo: objUser ? objUser.photo : objCarrier.photo,
                location: objUser ? objUser.zone : objCarrier.location,
                idRole: objUser ? objUser.id : objCarrier.id,
                mensaje: true
            };
            // console.log("PAYLOAD en verifytoken", payload);
            return res.json({ payload, mensaje: 'the access token is valid' });
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post('/user', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const data1 = JSON.parse(req.body)
    // console.log("Estes es el body", req.body);
    const { name, lastName, phone, password, eMail, terminosCondiciones, role } = req.body;
    let passwordHash = yield bcrypt.hash(password, 8);
    let payload = {
        id: (0, uuidv4_1.uuid)(),
        name,
        lastName,
        password: passwordHash,
        phone,
        terminosCondiciones,
        eMail,
        role
    };
    try {
        const [user /*usuario creado o excistente */, created /*boolean true->lo creo false->no lo creo pq exciste */] = yield User_Reg_1.User_Reg.findOrCreate({
            where: { eMail: eMail },
            defaults: payload,
        });
        if (!created) {
            const payload = {
                role: 1,
            };
            return res.json({ payload, mensaje: 'eMail usado' }); //podria ser un boolean 
        }
        return res.json({
            mensaje: 'Usuario creado', payload
        }).status(300);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
