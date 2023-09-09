import { newUser } from "src/db/Entities/user";
declare class NewUserInput implements newUser {
    email: string;
    password: string;
    name: string;
}
export default NewUserInput;
