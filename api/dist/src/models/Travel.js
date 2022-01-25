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
exports.Travel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Carrier_1 = require("./Carrier");
const Review_1 = require("./Review");
const User_1 = require("./User");
let Travel = class Travel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({ primaryKey: true }),
    __metadata("design:type", String)
], Travel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "orig", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "destination", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "weight", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "finishedTravel", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Review_1.Review),
    __metadata("design:type", Review_1.Review)
], Travel.prototype, "rewiew", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Travel.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Travel.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Travel.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    __metadata("design:type", Object)
], Travel.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Carrier_1.Carrier),
    __metadata("design:type", Carrier_1.Carrier)
], Travel.prototype, "carrier", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Carrier_1.Carrier),
    __metadata("design:type", String)
], Travel.prototype, "carrierId", void 0);
Travel = __decorate([
    sequelize_typescript_1.Table
], Travel);
exports.Travel = Travel;
