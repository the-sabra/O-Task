// src/types.ts
import { ObjectType, Field, ID } from "type-graphql";

type status = "done" | "pending";

@ObjectType()
class Task {
  @Field((_type) => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  status: status;

  @Field({ nullable: true })
  parent_id: number;

  @Field(() => [Task!], { nullable: true })
  childTasks: [Task];

  @Field()
  createdAt: Date;
}
export { Task };
