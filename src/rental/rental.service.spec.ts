/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { RentalService } from './rental.service';

describe('RentalService', () => {
  let service: RentalService;

  const mockRentalRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
  };
  const mockUserRepo = { findOneBy: jest.fn() };
  const mockVehicleRepo = { findOneBy: jest.fn(), save: jest.fn() };
  const mockDataSource = {
    transaction: jest.fn(async (fn) => fn({ save: async (e: any) => e })),
  };

  beforeEach(() => {
    service = new RentalService(
      mockRentalRepo as any,
      mockUserRepo as any,
      mockVehicleRepo as any,
      mockDataSource as any,
    );
  });

  it('creates a rental', async () => {
    const user = { id: 'v1' };
    const vehicle = { id: 'v1', available: true };

    mockUserRepo.findOneBy.mockResolvedValue(user);
    mockVehicleRepo.findOneBy.mockResolvedValue(vehicle);
    mockRentalRepo.create.mockImplementation((e) => e);

    const dto = {
      userId: 'v1',
      vehicleId: 'v3',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    const result = await service.create(dto);

    expect(result.user).toBe(user);
    expect(result.vehicle).toBe(vehicle);
    expect(result.vehicle.available).toBe(false);
  });
});

describe("RentalService", ()=> {
    let service: Rentalservice;

    const mockUserRepo = { create: jest.fn(), save: jest.fn(), find: jest.find(), findOneBy: jest.fn()}
    const mockUserRepo = { save: jest.fn(), findOneBy: jest.fn}
    const mockVehicleRepo = { save: jest.fn(), findOneBy: jest.fn}
    const mockDataSource = { transa}
})