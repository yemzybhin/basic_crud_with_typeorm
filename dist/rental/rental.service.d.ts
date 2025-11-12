import { CreateRentalDto } from 'src/dto/createRental.dto';
import { UpdateRentalDto } from 'src/dto/updateRental.dto';
import { Rental } from 'src/entities/rental.entity';
import { User } from 'src/entities/user.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { DataSource, Repository } from 'typeorm';
export declare class RentalService {
    private rentalRepo;
    private vehicleRepo;
    private userRepo;
    private dataSource;
    constructor(rentalRepo: Repository<Rental>, vehicleRepo: Repository<Vehicle>, userRepo: Repository<User>, dataSource: DataSource);
    create(dto: CreateRentalDto): Promise<Rental>;
    findAll(): Promise<Rental[]>;
    updateRental(id: string, dto: UpdateRentalDto): Promise<Rental>;
}
