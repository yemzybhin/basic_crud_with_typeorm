import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rental } from './rental.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column({ default: true })
  available: boolean;

  @OneToMany(() => Rental, (rental) => rental.vehicle)
  rentals: Rental[];
}
