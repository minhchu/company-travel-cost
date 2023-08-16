import { Field, ObjectType } from '@nestjs/graphql';

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

  @Field()
  children: Company[];
}
