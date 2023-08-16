import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  imports: [HttpModule],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
