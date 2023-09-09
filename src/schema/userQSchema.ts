import { ObjectType, Field, InputType, ID } from "type-graphql";

@ObjectType()
class User {
  @Field((type) => ID)
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
