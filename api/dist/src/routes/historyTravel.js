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
const Carrier_1 = require("../models/Carrier");
const Travel_1 = require("../models/Travel");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/historyTravelUser/:idUserReg', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { idUserReg } = req.params;
    console.log(req.params);
    try {
        let user = yield User_1.User.findOne({ where: { idUserReg: idUserReg } });
        if (!user) {
            return res.json({ menssage: 'Not found user' });
        }
        let travel = yield Travel_1.Travel.findAll({
            where: {
                userId: user.id,
            },
            include: [{
                    model: Carrier_1.Carrier
                }]
        });
        if (travel.length > 0) {
            return res.json({ menssage: 'Found Travel', payload: travel });
        }
        else {
            return res.json({ menssage: 'Not found Travels' });
        }
    }
    catch (err) {
        next(err);
    }
}));
router.get(`/historyTravelCarrier/:idUser_Reg`, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { idUser_Reg } = req.params;
    try {
        let user = yield Carrier_1.Carrier.findOne({ where: { idUserReg: idUser_Reg } }); //carrier 
        if (!user) {
            return res.json({ menssage: 'Not found carrier' });
        }
        let travel = yield Travel_1.Travel.findAll({
            where: {
                carrierId: user.id //el id del carrier 
            },
            include: [{
                    model: User_1.User
                }]
        });
        if (travel.length > 0) {
            res.json({ menssage: 'Found Travel', payload: travel });
        }
        else {
            return res.json({ menssage: 'Not found Travels' });
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
