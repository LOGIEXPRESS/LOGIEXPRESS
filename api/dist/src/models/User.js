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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Travel_1 = require("./Travel");
const User_Reg_1 = require("./User_Reg");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "identification", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "zone", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "account", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_Reg_1.User_Reg),
    __metadata("design:type", String)
], User.prototype, "user_Reg", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_Reg_1.User_Reg),
    __metadata("design:type", String)
], User.prototype, "idUserReg", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Travel_1.Travel),
    __metadata("design:type", Travel_1.Travel)
], User.prototype, "travel", void 0);
User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;
