"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrier = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_Reg_1 = require("./User_Reg");
const Vehicle_1 = require("./Vehicle");
let Carrier = class Carrier extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({ primaryKey: true }),
    __metadata("design:type", String)
], Carrier.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Carrier.prototype, "documentID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Carrier.prototype, "license", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Carrier.prototype, "Active", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Carrier.prototype, "location", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Carrier.prototype, "Cuenta", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Carrier.prototype, "photo", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_Reg_1.User_Reg),
    __metadata("design:type", User_Reg_1.User_Reg)
], Carrier.prototype, "user_Reg", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_Reg_1.User_Reg),
    __metadata("design:type", String)
], Carrier.prototype, "idUserReg", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Vehicle_1.Vehicle),
    __metadata("design:type", Vehicle_1.Vehicle)
], Carrier.prototype, "vehicle", void 0);
Carrier = __decorate([
    sequelize_typescript_1.Table
], Carrier);
exports.Carrier = Carrier;
