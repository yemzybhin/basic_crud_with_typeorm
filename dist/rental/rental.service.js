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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rental_entity_1 = require("../entities/rental.entity");
const user_entity_1 = require("../entities/user.entity");
const vehicle_entity_1 = require("../entities/vehicle.entity");
const typeorm_2 = require("typeorm");
let RentalService = class RentalService {
    rentalRepo;
    vehicleRepo;
    userRepo;
    dataSource;
    constructor(rentalRepo, vehicleRepo, userRepo, dataSource) {
        this.rentalRepo = rentalRepo;
        this.vehicleRepo = vehicleRepo;
        this.userRepo = userRepo;
        this.dataSource = dataSource;
    }
    async create(dto) {
        const user = await this.userRepo.findOneBy({ id: dto.userId });
        const vehicle = await this.vehicleRepo.findOneBy({ id: dto.vehicleId });
        if (!user)
            throw new common_1.NotFoundException('This user does not exist');
        if (!vehicle)
            throw new common_1.NotFoundException('This vehicle does not exist');
        if (!vehicle.available)
            throw new common_1.BadRequestException('This vehicle is not available');
        const startDate = new Date(dto.startDate);
        const endDate = new Date(dto.endDate);
        return await this.dataSource.transaction(async (manager) => {
            vehicle.available = false;
            await manager.save(vehicle);
            const rental = this.rentalRepo.create({
                user,
                vehicle,
                startDate,
                endDate,
                status: rental_entity_1.RentalStatus.ACTIVE,
                totalPrice: 30000000,
            });
            return await manager.save(rental);
        });
    }
    findAll() {
        return this.rentalRepo.find();
    }
    async updateRental(id, dto) {
        const rental = await this.rentalRepo.findOneBy({ id });
        if (!rental)
            throw new common_1.NotFoundException('Rental does not exist');
        if (dto.status === rental_entity_1.RentalStatus.COMPLETED) {
            rental.vehicle.available = true;
            await this.vehicleRepo.save(rental.vehicle);
        }
        Object.assign(rental, dto);
        return await this.rentalRepo.save(rental);
    }
};
exports.RentalService = RentalService;
exports.RentalService = RentalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rental_entity_1.Rental)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], RentalService);
//# sourceMappingURL=rental.service.js.map