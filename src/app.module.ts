import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      username: 'postgres',
      database: 'demo_database',
      host: 'localhost',
      type: 'postgres',
      port: 5432,
      password: 'ORoromopol114',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Rental, User, Vehicle],
    }),
    RentalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
