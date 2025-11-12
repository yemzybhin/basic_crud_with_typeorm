import { RentalService } from './rental.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { RentalStatus } from 'src/entities/rental.entity';

describe('RentalService', () => {
  let service: RentalService;

  const mockRentalRepo = { create: jest.fn(), save: jest.fn(), find: jest.fn(), findOneBy: jest.fn() };
  const mockUserRepo = { findOneBy: jest.fn() };
  const mockVehicleRepo = { findOneBy: jest.fn(), save: jest.fn() };
  const mockDataSource = { transaction: jest.fn(async (fn) => fn({ save: async (e) => e })) };

  beforeEach(() => {
    service = new RentalService(
      mockRentalRepo as any,
      mockVehicleRepo as any,
      mockUserRepo as any,
      mockDataSource as any,
    );
  });

  // ===== create() tests =====
  it('creates a rental', async () => {
    const user = { id: 'u1' };
    const vehicle = { id: 'v1', available: true };
    mockUserRepo.findOneBy.mockResolvedValue(user);
    mockVehicleRepo.findOneBy.mockResolvedValue(vehicle);
    mockRentalRepo.create.mockImplementation((r) => r);

    const dto = { userId: 'u1', vehicleId: 'v1', startDate: new Date().toISOString(), endDate: new Date().toISOString() };
    const result = await service.create(dto);

    expect(result.user).toBe(user);
    expect(result.vehicle).toBe(vehicle);
    expect(result.vehicle.available).toBe(false);
  });

  it('throws NotFoundException if user missing', async () => {
    mockUserRepo.findOneBy.mockResolvedValue(null);
    await expect(service.create({ userId: 'x', vehicleId: 'v', startDate: '', endDate: '' }))
      .rejects.toThrow(NotFoundException);
  });

  it('throws BadRequestException if vehicle unavailable', async () => {
    mockUserRepo.findOneBy.mockResolvedValue({ id: 'u1' });
    mockVehicleRepo.findOneBy.mockResolvedValue({ id: 'v1', available: false });
    await expect(service.create({ userId: 'u1', vehicleId: 'v1', startDate: '', endDate: '' }))
      .rejects.toThrow(BadRequestException);
  });

  // ===== findAll() test =====
  it('returns all rentals', async () => {
    const rentals = [{ id: 'r1' }, { id: 'r2' }];
    mockRentalRepo.find.mockResolvedValue(rentals);

    const result = await service.findAll();
    expect(result).toBe(rentals);
  });

  // ===== updateRental() tests =====
  it('updates rental status', async () => {
    const rental = { id: 'r1', vehicle: { available: false }, status: RentalStatus.ACTIVE };
    mockRentalRepo.findOneBy.mockResolvedValue(rental);
    mockRentalRepo.save.mockImplementation((r) => r);
    mockVehicleRepo.save.mockImplementation((v) => v);

    const dto = { status: RentalStatus.COMPLETED };
    const result = await service.updateRental('r1', dto);

    expect(result.status).toBe(RentalStatus.COMPLETED);
    expect(result.vehicle.available).toBe(true);
  });

  it('throws NotFoundException if rental not found', async () => {
    mockRentalRepo.findOneBy.mockResolvedValue(null);
    await expect(service.updateRental('x', { status: RentalStatus.COMPLETED }))
      .rejects.toThrow(NotFoundException);
  });
});
