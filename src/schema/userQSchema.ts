import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class User {
  @Field((_type) => ID)
  id: number;

  @Field()
  email: string;

  // @Field({ nullable: true })
  // password: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  token: String;
}

export { User };
