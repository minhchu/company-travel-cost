import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('/api/companies')
export class CompanyController {
  constructor(private company: CompanyService) {}

  @Get('/')
  async index() {
    return await this.company.buildCompanyTree();
  }
}
