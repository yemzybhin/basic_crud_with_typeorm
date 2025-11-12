import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rental } from './rental.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Rental, (rental) => rental.user)
  rentals: Rental[];
}
