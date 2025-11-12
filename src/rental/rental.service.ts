import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentalDto } from 'src/dto/createRental.dto';
import { UpdateRentalDto } from 'src/dto/updateRental.dto';
import { Rental, RentalStatus } from 'src/entities/rental.entity';
import { User } from 'src/entities/user.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental) private rentalRepo: Repository<Rental>,
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(dto: CreateRentalDto): Promise<Rental> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    const vehicle = await this.vehicleRepo.findOneBy({ id: dto.vehicleId });

    if (!user) throw new NotFoundException('This user does not exist');
    if (!vehicle) throw new NotFoundException('This vehicle does not exist');
    if (!vehicle.available)
      throw new BadRequestException('This vehicle is not available');

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
        status: RentalStatus.ACTIVE,
        totalPrice: 30000000,
      });
      return await manager.save(rental);
    });
  }

  findAll() {
    return this.rentalRepo.find();
  }

  async updateRental(id: string, dto: UpdateRentalDto): Promise<Rental> {
    const rental = await this.rentalRepo.findOneBy({ id });
    if (!rental) throw new NotFoundException('Rental does not exist');
    if (dto.status === RentalStatus.COMPLETED) {
      rental.vehicle.available = true;
      await this.vehicleRepo.save(rental.vehicle);
    }
    Object.assign(rental, dto);
    return await this.rentalRepo.save(rental);
  }
}
