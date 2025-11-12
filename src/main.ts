import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { User } from './entities/user.entity';
// import { Vehicle } from './entities/vehicle.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // const dataSource = app.get(DataSource);

  // const userRepo = dataSource.getRepository(User);
  // const vehicleRepo = dataSource.getRepository(Vehicle);

  // const users = userRepo.create([
  //   { name: 'Adeyemi', email: 'AdeyemiOduyungbo@gmail.com', rentals: [] },
  //   { name: 'eyemi', email: 'Adeyeungbo@gmail.com', rentals: [] },
  //   { name: '6rfghvdwq', email: 'AdeyemiOduycom', rentals: [] },
  // ]);
  // await userRepo.save(users);

  // const vehicles = vehicleRepo.create([
  //   {
  //     make: 'Adeyemi',
  //     model: 'AdeyemiOduyungbo@gmail.com',
  //     available: false,
  //     rentals: [],
  //   },
  //   {
  //     make: 'Adeyemi',
  //     model: 'AdeyemiOduyungbo@gmail.com',
  //     available: false,
  //     rentals: [],
  //   },
  //   {
  //     make: 'Adeyemi',
  //     model: 'AdeyemiOduyungbo@gmail.com',
  //     available: false,
  //     rentals: [],
  //   },
  // ]);
  // await vehicleRepo.save(vehicles);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
