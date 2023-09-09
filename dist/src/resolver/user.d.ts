import { User } from "../schema/userQSchema";
import NewUserInput from "../inputs/newUser";
import SignInInput from "../inputs/SignIn";
declare class UserResolver {
    signUp(newUser: NewUserInput): Promise<User>;
    signIn(userSignIn: SignInInput): Promise<User>;
}
export default UserResolver;
