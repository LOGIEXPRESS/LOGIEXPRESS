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
exports.User_Reg = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Carrier_1 = require("./Carrier");
const User_1 = require("./User");
// @Table
// export class User extends Model {
//   @Column name!: string;
//   @HasMany(() => Post) posts: Post[];
// }
// @Table
// export class Post extends Model {
//   @Column text!: string;
//   @ForeignKey(() => User) @Column userId!: number;
//   @BelongsTo(() => User) user: User;
// }
// User_Reg.hasOne(Carrier)
// Carrier.belongsTo(User_Reg)
let User_Reg = class User_Reg extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({ primaryKey: true }),
    __metadata("design:type", String)
], User_Reg.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Carrier_1.Carrier),
    __metadata("design:type", Carrier_1.Carrier)
], User_Reg.prototype, "carrier", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], User_Reg.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User_Reg.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User_Reg.prototype, "lastName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User_Reg.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User_Reg.prototype, "eMail", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User_Reg.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User_Reg.prototype, "terminosCondiciones", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User_Reg.prototype, "role", void 0);
User_Reg = __decorate([
    sequelize_typescript_1.Table
], User_Reg);
exports.User_Reg = User_Reg;
