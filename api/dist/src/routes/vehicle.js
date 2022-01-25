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
const Vehicle_1 = require("../models/Vehicle");
const router = (0, express_1.Router)();
router.get("/vehicleDetails/:idRole", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRole } = req.params;
    //console.log('soy idRole back', req.params)
    try {
        let userCarrier = yield Carrier_1.Carrier.findAll({ where: { id: idRole } });
        //console.log('soy lo que encuentra el idRole', userCarrier)
        let vehicleDetails = yield Vehicle_1.Vehicle.findAll({ where: { CarrierId: userCarrier[0].id } });
        const payload = {
            brand: vehicleDetails[0].brand,
            patent: vehicleDetails[0].patent,
            model: vehicleDetails[0].model,
            color: vehicleDetails[0].color,
            capacity: vehicleDetails[0].capacity,
            carrier: vehicleDetails[0].carrier,
        };
        return res.json(payload);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
