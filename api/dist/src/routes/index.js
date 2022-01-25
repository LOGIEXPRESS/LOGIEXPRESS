"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const login_1 = __importDefault(require("./login"));
const profiles_1 = __importDefault(require("./profiles"));
const review_1 = __importDefault(require("./review"));
const travel_1 = __importDefault(require("./travel"));
const uploadDataFake_1 = __importDefault(require("./uploadDataFake"));
const changePassword_1 = __importDefault(require("./changePassword"));
const historyTravel_1 = __importDefault(require("./historyTravel"));
const vehicle_1 = __importDefault(require("./vehicle"));
const payments_1 = __importDefault(require("./payments"));
const router = (0, express_1.Router)();
// router.use('/', dataFake)
router.use('/', user_1.default);
router.use('/', login_1.default);
router.use('/', profiles_1.default);
router.use('/', travel_1.default);
router.use('/', uploadDataFake_1.default);
router.use('/', review_1.default);
router.use('/', payments_1.default);
router.use('/', review_1.default);
router.use('/', changePassword_1.default);
router.use('/', historyTravel_1.default);
router.use('/', vehicle_1.default);
//router.use('/', UploadDataFake) 
exports.default = router;
