import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TreeModel from 'tree-model';

type Company = {
  id: string;
  createdAt: string;
  name: string;
  parentId: string;
};

type CompanyTree = Company & {
  cost: number;
  children: Array<CompanyTree>;
};

type Travel = {
  id: string;
  createdAt: string;
  employeeName: string;
  departure: string;
  destination: string;
  price: string;
  companyId: string;
};

@Injectable({})
export class CompanyService {
  constructor(
    private config: ConfigService,
    private http: HttpService,
  ) {}

  async buildCompanyTree(): Promise<any> {
    const companies = await this.getCompanyData();

    const travelCostByCompanyId = await this.buildTravelCostByCompanyId();

    const tree = new TreeModel();

    let root: null | TreeModel.Node<any>;

    const result = companies.reduce<Array<CompanyTree>>(
      (accumulator, current) => {
        // TODO: if there are multiple roots ?
        if (current.parentId === '0') {
          const cost = travelCostByCompanyId.get(current.id);

          const node = {
            ...current,
            cost,
            children: [],
          };

          root = tree.parse(node);

          return [...accumulator, node];
        }

        const parentId = current.parentId;

        const child = root.first((node) => {
          return node.model.id === parentId;
        });

        const newNode = new TreeModel();

        const cost = travelCostByCompanyId.get(current.id);

        const currentNode = {
          ...current,
          cost,
        };

        child.addChild(newNode.parse(currentNode));

        return accumulator;
      },
      [],
    );

    // depth-first search => walk from leaf to caculate cost
    root.walk({ strategy: 'post' }, (node) => {
      const parentId = node.model.parentId;

      const parent = root.first((n) => n.model.id === parentId);

      if (parent) {
        parent.model.cost = parent.model.cost + node.model.cost;
      }

      return true;
    });

    return result;
  }

  protected async buildTravelCostByCompanyId(): Promise<Map<string, number>> {
    const travels = await this.getTravelCostData();

    const travelCostByCompanyId = new Map<string, number>();

    travels.forEach((travel) => {
      const companyId = travel.companyId;

      if (travelCostByCompanyId.has(companyId)) {
        const price = travelCostByCompanyId.get(companyId);

        travelCostByCompanyId.set(companyId, price + Number(travel.price));
      } else {
        travelCostByCompanyId.set(companyId, Number(travel.price));
      }
    });

    return travelCostByCompanyId;
  }

  protected async getTravelCostData() {
    const apiRoot = this.config.get('api.mock_api');

    const travels = await this.http.axiosRef.get<Array<Travel>>(
      `${apiRoot}/webprovise/travels`,
    );

    return travels.data;
  }

  protected async getCompanyData() {
    const apiRoot = this.config.get('api.mock_api');

    const companies = await this.http.axiosRef.get<Array<Company>>(
      `${apiRoot}/webprovise/companies`,
    );

    return companies.data;
  }
}
