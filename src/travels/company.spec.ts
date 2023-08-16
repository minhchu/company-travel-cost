import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let companyService: CompanyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        CompanyService,
        { provide: 'config', useExisting: ConfigService },
      ],
    }).compile();

    companyService = app.get<CompanyService>(CompanyService);
  });

  describe('CompanyService', () => {
    it('should build tree', () => {
      expect(companyService.buildCompanyTree()).toBe([]);
    });
  });
});
