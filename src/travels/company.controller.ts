import { HttpService } from '@nestjs/axios';
import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompanyService } from './company.service';

@Controller('/api/companies')
export class CompanyController {
  constructor(
    private config: ConfigService,
    private http: HttpService,
    private company: CompanyService,
  ) {}

  @Get('/')
  async index() {
    return await this.company.buildCompanyTree();
  }
}
