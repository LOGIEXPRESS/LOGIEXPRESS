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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
router.post('/changePassword', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, newPassword } = req.body;
    console.log('id user: ', idUser);
    console.log('newPass: ', newPassword);
    try {
        let userEdit = yield User_Reg_1.User_Reg.findByPk(idUser)
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (!user) {
                return res.json({ menssage: 'Not found UserEdit' });
            }
            else {
                let newPasswordHash = yield bcryptjs_1.default.hash(newPassword, 8);
                yield user.update({ password: newPasswordHash });
                return user;
            }
        }));
        res.json({ menssage: 'update password ok', payload: userEdit });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
