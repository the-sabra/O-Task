import {
  IS_ALPHANUMERIC,
  IsAlphanumeric,
  IsEmail,
  Length,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class SignInInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 15)
  password: string;
}

export default SignInInput;
