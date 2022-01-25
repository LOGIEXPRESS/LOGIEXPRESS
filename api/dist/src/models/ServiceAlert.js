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
exports.ServiceAlert = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Carrier_1 = require("./Carrier");
const Travel_1 = require("./Travel");
let ServiceAlert = class ServiceAlert extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ primaryKey: true }),
    __metadata("design:type", Number)
], ServiceAlert.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ServiceAlert.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ServiceAlert.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Travel_1.Travel),
    __metadata("design:type", Travel_1.Travel)
], ServiceAlert.prototype, "travel", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Travel_1.Travel),
    __metadata("design:type", String)
], ServiceAlert.prototype, "TravelId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Carrier_1.Carrier),
    __metadata("design:type", Carrier_1.Carrier)
], ServiceAlert.prototype, "carrier", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Carrier_1.Carrier),
    __metadata("design:type", String)
], ServiceAlert.prototype, "CarrierId", void 0);
ServiceAlert = __decorate([
    sequelize_typescript_1.Table
], ServiceAlert);
exports.ServiceAlert = ServiceAlert;
