import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';

export enum RentalStatus {
  PENDING,
  COMPLETED,
  ACTIVE,
}

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.rentals)
  user: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.rentals)
  vehicle: Vehicle;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('decimal')
  totalPrice: number;

  @Column({ type: 'enum', enum: RentalStatus, default: RentalStatus.ACTIVE })
  status: RentalStatus;
}
