import { Rental } from './rental.entity';
export declare class Vehicle {
    id: string;
    make: string;
    model: string;
    available: boolean;
    rentals: Rental[];
}
