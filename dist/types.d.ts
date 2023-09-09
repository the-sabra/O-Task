declare class User {
    id: number;
    username: string;
    email: string;
}
declare class CreateUserInput {
    username: string;
    email: string;
}
declare const users: User[];
export { User, CreateUserInput, users };
