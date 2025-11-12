import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from 'src/dto/createRental.dto';
import { UpdateRentalDto } from 'src/dto/updateRental.dto';

@Controller('rentals')
export class RentalController {
  constructor(private rentalService: RentalService) {}

  @Get()
  findAll() {
    return this.rentalService.findAll();
  }

  @Post()
  createRental(@Body() dto: CreateRentalDto) {
    return this.rentalService.create(dto);
  }

  @Patch(':id')
  updateStatus(@Param() id: string, @Body() dto: UpdateRentalDto) {
    return this.rentalService.updateRental(id, dto);
  }
}
