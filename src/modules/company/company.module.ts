import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  imports: [HttpModule],
  providers: [CompanyService, CompanyResolver],
})
export class CompanyModule {}
