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
const User_1 = require("../models/User");
const uuidv4_1 = require("uuidv4");
const Carrier_1 = require("../models/Carrier");
const Vehicle_1 = require("../models/Vehicle");
const User_Reg_1 = require("../models/User_Reg");
const router = (0, express_1.Router)();
router.post('/userProfile', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('llega al user profile')
    const { id, identification, zone, photo, account, phone } = req.body;
    try {
        let newProfile = {
            id: (0, uuidv4_1.uuid)(),
            identification: identification,
            zone: zone,
            phone: phone,
            photo: photo,
            account: account,
            idUserReg: id
        };
        User_1.User.create(newProfile)
            .then((newProfile) => {
            res.send(newProfile);
        });
    }
    catch (err) {
        next(err);
    }
}));
router.post('/carrierProfile', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('llega al carrier profile')
    const { id, documentID, license, location, Cuenta, brand, patent, model, color, capacity, photo } = req.body;
    try {
        let idCarrier = (0, uuidv4_1.uuid)();
        let newProfileCarrier = {
            id: idCarrier,
            documentID: documentID,
            license: license,
            location: location,
            Cuenta: Cuenta,
            photo: photo,
            idUserReg: id
        };
        var newTrack = {
            id: (0, uuidv4_1.uuid)(),
            brand: brand || null,
            patent: patent || null,
            model: model || null,
            color: color || null,
            capacity: capacity || null,
            CarrierId: idCarrier
        };
        let carrier = yield Carrier_1.Carrier.create(newProfileCarrier);
        let track = yield Vehicle_1.Vehicle.create(newTrack);
        res.send('Ok');
    }
    catch (err) {
        next(err);
    }
}));
//DEBUG
router.get('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('llega al  profile')
    const { id } = req.params;
    // const id = req.params.id
    console.log(req.params.id); // llega undefined
    const user = yield User_1.User.findByPk(id);
    // console.log(user)
    if (user === null) {
        const carrier = yield Carrier_1.Carrier.findByPk(id);
        const carrierData = {
            documentID: carrier === null || carrier === void 0 ? void 0 : carrier.documentID,
            license: carrier === null || carrier === void 0 ? void 0 : carrier.license,
            Active: carrier === null || carrier === void 0 ? void 0 : carrier.Active,
            location: carrier === null || carrier === void 0 ? void 0 : carrier.location,
            cuenta: carrier === null || carrier === void 0 ? void 0 : carrier.Cuenta,
            photo: carrier === null || carrier === void 0 ? void 0 : carrier.photo,
            // travel: carrier?.travel
        };
        return carrierData ? res.json(carrierData) : res.status(404).send("Carrier Not Found");
    }
    const userData = {
        identification: user.identification,
        zone: user.zone,
        photo: user.photo,
        account: user.account,
    };
    return userData ? res.json(userData) : res.status(404).send("User Not Found");
}));
router.post('/updateUser', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, lastName, phone, photo, zone, account } = req.body;
        let userUpdate;
        let userDataUpdate;
        if (name || lastName || phone) {
            let upDateThis = {};
            if (name) {
                upDateThis.name = name;
            }
            if (lastName) {
                upDateThis.lastName = lastName;
            }
            if (phone) {
                upDateThis.phone = phone;
            }
            userUpdate = yield User_Reg_1.User_Reg.update(upDateThis /*{name: name, lastName: lastName, phone: phone}*/, {
                where: {
                    id
                },
                returning: true,
            });
        }
        if (photo || zone || account) {
            let upDateThis = {};
            if (photo) {
                upDateThis.photo = photo;
            }
            if (zone) {
                upDateThis.zone = zone;
            }
            if (account) {
                upDateThis.account = account;
            }
            userDataUpdate = yield User_1.User.update(upDateThis /*{photo: photo, zone: zone, account: account}*/, {
                where: {
                    idUserReg: id
                },
                returning: true,
            });
        }
        if (userUpdate && userDataUpdate) {
            res.status(200).json({ "msg": "Tu informacion se actualizo exitosamente", "userReg": userUpdate[1][0], "user": userDataUpdate[1][0] });
        }
        else if (userUpdate) {
            res.status(200).json({ "msg": "Tu informacion se actualizo exitosamente", "userReg": userUpdate[1][0] });
            // console.log(userUpdate[1])
        }
        else if (userDataUpdate) {
            res.status(200).json({ "msg": "Tu informacion se actualizo exitosamente", "user": userDataUpdate[1][0] });
        }
        else {
            res.status(404).json({ msg: 'No se encontro usuario registrado' });
        }
    }
    catch (err) {
        res.status(404).json({ msg: "rompio" });
        console.log(err);
    }
}));
router.post('/editCarrier', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, lastName, phone, documentID, license, location, Cuenta, photo } = req.body;
        let carrier;
        let carrierData;
        if (name || lastName || phone) {
            let upDateThis = {};
            if (name) {
                upDateThis.name = name;
            }
            if (lastName) {
                upDateThis.lastName = lastName;
            }
            if (phone) {
                upDateThis.phone = phone;
            }
            carrier = yield User_Reg_1.User_Reg.update(upDateThis /*{name: name, lastName: lastName, phone: phone}*/, {
                where: {
                    id,
                },
                returning: true,
            });
        }
        if (documentID || license || location || Cuenta || photo) {
            let upDateThis = {};
            if (documentID) {
                upDateThis.documentID = documentID;
            }
            if (license) {
                upDateThis.license = license;
            }
            if (location) {
                upDateThis.location = location;
            }
            if (Cuenta) {
                upDateThis.Cuenta = Cuenta;
            }
            if (photo) {
                upDateThis.photo = photo;
            }
            carrierData = yield Carrier_1.Carrier.update(upDateThis /*{documentID: documentID, license: license, location: location, Cuenta: Cuenta}*/, {
                where: {
                    idUserReg: id
                },
                returning: true,
            });
        }
        if (carrier && carrierData) {
            res.status(200).json({ "msg": "Tu informacion se actualizo exitosamente", "userReg": carrier[1][0], "carrier": carrierData[1][0] });
        }
        else if (carrier) {
            res.status(200).json({ "msg": "Tu informacion se actualizo exitosamente", "userReg": carrier[1][0] });
        }
        else if (carrierData) {
            res.status(200).json({ "msg": "Tu informacion se actualizo exitosamente", "carrier": carrierData[1][0] });
        }
        else {
            res.status(404).json({ msg: 'No se encontro usuario registrado' });
        }
    }
    catch (err) {
        res.status(404).json({ msg: "bum" });
        console.log(err);
    }
}));
router.post('/updateVehicle', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, brand, patent, model, color, capacity } = req.body;
        const carrierId = yield Carrier_1.Carrier.findOne({ where: { idUserReg: id } });
        let vehicle;
        if (brand || patent || model || color || capacity) {
            let upDateThis = {};
            if (brand) {
                upDateThis.brand = brand;
            }
            if (patent) {
                upDateThis.patent = patent;
            }
            if (model) {
                upDateThis.model = model;
            }
            if (color) {
                upDateThis.color = color;
            }
            if (capacity) {
                upDateThis.capacity = capacity;
            }
            vehicle = yield Vehicle_1.Vehicle.update(upDateThis /*{brand: brand, patent: patent, model: model, color: color, capacity: capacity}*/, {
                where: {
                    CarrierId: carrierId === null || carrierId === void 0 ? void 0 : carrierId.id
                },
                returning: true,
            });
        }
        if (vehicle) {
            res.status(200).json({ "msg": "Tu informacion se actualizo exitosamente", "vehicle": vehicle[1][0] });
        }
        else {
            res.status(404).json({ "msg": 'No se encontro usuario registrado' });
        }
    }
    catch (err) {
        res.status(404).json({ msg: "rompio" });
        console.log(err);
    }
}));
// router.put('/changepassword', async (req: Request, res: Response, next: NextFunction) => {
// 	const { eMail, password } = req.body
// 	try {
// 		const userPassword = await User_Reg.findOne({ where: { eMail } })
// 		if (userPassword) {
// 			const updatePassword = await userPassword.update(User_Reg, { where: { password: password } });
// 			return res.status(200).json(updatePassword)
// 		}
// 		return res.status(404).json({ msg: "No se pudo actualizar la base de datos" })
// 	} catch (err) {
// 		next(err)
// 	}
// })
// router.put('/capacity', async (req: Request, res: Response, next: NextFunction) => {
// 	const { eMail, capacity } = req.body
// 	try {
// 		const carrier = await Carrier.findOne({ where: { eMail } })
// 		const vehicle = await Vehicle.findOne({ where: { carrier: carrier?.id } })
// 		if (carrier && capacity) {
// 			const updateCapacity = await vehicle?.update(Vehicle, { where: { capacity: capacity } });
// 			return res.status(200).json(updateCapacity)
// 		}
// 		return res.status(404).json({ msg: "No se pudo actualizar la base de datos" })
// 	} catch (err) {
// 		next(err)
// 	}
// })
router.delete('/delete', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const existsInDBUser = yield User_1.User.findOne({
            where: {
                id,
            },
        });
        if (existsInDBUser) {
            User_1.User.destroy({
                where: {
                    id,
                },
            });
            return res.status(200).send("User has been deleted from database successfully");
        }
        else if (!existsInDBUser) {
            const existsInDBCarrier = yield Carrier_1.Carrier.findOne({
                where: {
                    id,
                },
            });
            existsInDBCarrier ? User_1.User.destroy({ where: { id, } }) : new Error("ERROR 500: User with given name does not exist in database");
        }
        ;
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
