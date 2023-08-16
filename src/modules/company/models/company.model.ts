import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Company {
  @Field()
  id: string;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  parentId: string;

  @Field()
  cost: number;

  // TODO: this is not type-safe
  @Field((type) => GraphQLJSON)
  children: JSON;
}
