import { Resolver, Query } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './models/company.model';

@Resolver((of) => Company)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query((returns) => [Company], { name: 'companies' })
  async company() {
    // TODO: maybe we can get a particular cost of a company
    return await this.companyService.buildCompanyTree();
  }
}
