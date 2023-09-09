import { Request } from "express";
export type payload = {
    userId: number;
};
export interface MyContext {
    req: Request & payload;
}
