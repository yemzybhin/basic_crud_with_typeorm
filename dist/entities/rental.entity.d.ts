import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
export declare enum RentalStatus {
    PENDING = 0,
    COMPLETED = 1,
    ACTIVE = 2
}
export declare class Rental {
    id: string;
    user: User;
    vehicle: Vehicle;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
}
