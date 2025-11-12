import { IsDateString, IsUUID } from 'class-validator';

export class CreateRentalDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  vehicleId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
