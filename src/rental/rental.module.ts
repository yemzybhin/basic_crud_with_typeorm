import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from 'src/entities/rental.entity';
import { User } from 'src/entities/user.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Rental, Vehicle, User])],
  providers: [RentalService],
  controllers: [RentalController],
})
export class RentalModule {}
