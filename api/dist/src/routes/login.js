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
const User_Reg_1 = require("../models/User_Reg");
const config_1 = __importDefault(require("../../config/config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const Carrier_1 = require("../models/Carrier");
// import passport from 'passport';
const router = (0, express_1.Router)();
// function createToken(payload: any) {
// 	return jwt.sign({ id: payload.id, email: payload.eMail }, config.jwtSecret, {
// 		expiresIn: 86400
// 	})
// }
function createToken(payload) {
    return jsonwebtoken_1.default.sign({ id: payload.id, email: payload.eMail }, config_1.default.jwtSecret, {
        expiresIn: 60
    });
}
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eMail, password } = req.body;
    const user = yield User_Reg_1.User_Reg.findAll({ where: { eMail: eMail } });
    /* const objUser = await User.findOne({where: { idUserReg : user[0].id}}) */
    if (user.length > 0) {
        const dataUser = yield User_1.User.findOne({ where: { idUserReg: user[0].id } });
        // console.log(photoUser!.photo, "fotoUser")
        const dataCarrier = yield Carrier_1.Carrier.findOne({ where: { idUserReg: user[0].id } });
        // console.log(photoCarrier!.photo, "fotoCarrier")
        const compare = yield bcryptjs_1.default.compare(password, user[0].password);
        if (compare) {
            const payload = {
                eMail,
                id: user[0].id,
                role: user[0].role,
                name: user[0].name,
                lastname: user[0].lastName,
                phone: user[0].phone,
                photo: dataCarrier ? dataCarrier.photo : dataUser.photo,
                location: dataCarrier ? dataCarrier.location : dataUser.zone,
                idRole: dataCarrier ? dataCarrier.id : dataUser.id,
            };
            return res.json({
                token: createToken(payload),
                mensaje: 'Autenticación correcta', payload
            }).status(200);
        }
        else {
            const payload = {
                eMail,
                id: user[0].id,
                role: 1,
                // role: user[0].role,
                name: user[0].name,
                lastname: user[0].lastName,
                phone: user[0].phone,
            };
            return res.json({
                mensaje: "Contrasena no coincide", payload
            }).status(300);
        }
    }
    else {
        const payload = {
            role: 1,
        };
        return res.json({ payload, mensaje: "usuario y mail ingresados son invalidos" }).status(301);
    }
}));
exports.default = router;
