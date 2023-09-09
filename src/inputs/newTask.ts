import { IsInt, IsOptional, IsString, Length } from "class-validator";
import { newTask } from "src/db/Entities/task";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewTaskInput implements newTask {
  @Field()
  @IsString()
  @Length(5, 265)
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  parent_id: number;
}
