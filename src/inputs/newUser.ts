import {
  IS_ALPHANUMERIC,
  IsAlphanumeric,
  IsEmail,
  Length,
} from "class-validator";
import { newUser } from "src/db/Entities/user";
import { Field, InputType } from "type-graphql";

@InputType()
class NewUserInput implements newUser {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 15)
  password: string;

  @Field()
  @Length(2, 15)
  @IsAlphanumeric()
  name: string;
}

export default NewUserInput;
