import { Resolver, Query, Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './models/company.model';

@Resolver((of) => Company)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query((returns) => [Company], { name: 'company' })
  async company(@Args('id') id: string) {
    return await this.companyService.buildCompanyTree(id);
  }
}
