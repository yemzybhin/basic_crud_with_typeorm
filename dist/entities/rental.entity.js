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
exports.Rental = exports.RentalStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const vehicle_entity_1 = require("./vehicle.entity");
var RentalStatus;
(function (RentalStatus) {
    RentalStatus[RentalStatus["PENDING"] = 0] = "PENDING";
    RentalStatus[RentalStatus["COMPLETED"] = 1] = "COMPLETED";
    RentalStatus[RentalStatus["ACTIVE"] = 2] = "ACTIVE";
})(RentalStatus || (exports.RentalStatus = RentalStatus = {}));
let Rental = class Rental {
    id;
    user;
    vehicle;
    startDate;
    endDate;
    totalPrice;
    status;
};
exports.Rental = Rental;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Rental.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.rentals),
    __metadata("design:type", user_entity_1.User)
], Rental.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.rentals),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], Rental.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Rental.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Rental.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Rental.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RentalStatus, default: RentalStatus.ACTIVE }),
    __metadata("design:type", Number)
], Rental.prototype, "status", void 0);
exports.Rental = Rental = __decorate([
    (0, typeorm_1.Entity)('rentals')
], Rental);
//# sourceMappingURL=rental.entity.js.map