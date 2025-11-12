import { RentalService } from './rental.service';
import { CreateRentalDto } from 'src/dto/createRental.dto';
import { UpdateRentalDto } from 'src/dto/updateRental.dto';
export declare class RentalController {
    private rentalService;
    constructor(rentalService: RentalService);
    findAll(): Promise<import("../entities/rental.entity").Rental[]>;
    createRental(dto: CreateRentalDto): Promise<import("../entities/rental.entity").Rental>;
    updateStatus(id: string, dto: UpdateRentalDto): Promise<import("../entities/rental.entity").Rental>;
}
