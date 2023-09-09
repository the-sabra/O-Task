import { User, CreateUserInput } from './types';
declare class UserResolver {
    getUser(id: number): User | undefined;
    createUser(data: CreateUserInput): User;
}
export default UserResolver;
