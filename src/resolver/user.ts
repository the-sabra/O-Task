import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../schema/userQSchema";
import NewUserInput from "../inputs/newUser";
import { Mutation, Resolver, Arg } from "type-graphql";
import { db } from "../db/DBClient";
import { users } from "../db/Entities/user";
import { eq } from "drizzle-orm";
import SignInInput from "../inputs/SignIn";
import { ApolloError } from "apollo-server-express";

@Resolver(User)
class UserResolver {
  
  @Mutation((_returns) => User)
  async signUp(@Arg("data") newUser: NewUserInput): Promise<User> {
    try {
      console.log(newUser);
      const checkEmail = await db
        .select({
          email: users.email,
        })
        .from(users)
        .where(eq(users.email, newUser.email));

      if (checkEmail[0]?.email) {
        throw new ApolloError("email exist");
      }
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const user = await db
        .insert(users)
        .values({
          email: newUser.email,
          password: hashedPassword,
          name: newUser.name,
        })
        .returning({
          id: users.id,
          name: users.name,
          email: users.email,
          createdAt: users.createdAt,
        });

      return user[0] as User;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Mutation((_returns) => User)
  async signIn(@Arg("data") userSignIn: SignInInput): Promise<User> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, userSignIn.email));

    if (!user[0]?.email) {
      throw new ApolloError("email not found");
    }
    const passCheck = await bcrypt.compare(
      userSignIn.password,
      user[0].password
    );
    if (!passCheck) {
      throw new ApolloError("wrong password");
    }

    //create token
    const privatekey: string = process.env.JWTSECERT!;
    const token = jwt.sign(
      {
        userId: user[0].id,
      },
      privatekey
    );

    const res = { ...user[0], token: token };
    return res;
  }
}

export default UserResolver;
