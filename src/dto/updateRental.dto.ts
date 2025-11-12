import { IsEnum, IsOptional } from 'class-validator';
import { RentalStatus } from 'src/entities/rental.entity';

export class UpdateRentalDto {
  @IsOptional()
  @IsEnum(RentalStatus)
  status?: RentalStatus;
}
