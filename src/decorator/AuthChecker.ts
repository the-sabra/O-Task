import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";
import { AuthChecker } from "type-graphql";
import { MyContext } from "types/MyContext";

export const customAuthChecker: AuthChecker<MyContext> = (
  { root, args, context, info },
  roles
) => {
  // Read user from context
  // and check the user's permission against the `roles` argument
  // that comes from the '@Authorized' decorator, eg. ["ADMIN", "MODERATOR"]
  const authHeader = context.req.get("Authorization");
  if (!authHeader) {
    throw new AuthenticationError("not authenticated");
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWTSECERT!);
  } catch (error) {
    throw error;
  }
  if (!decodedToken) {
    throw new AuthenticationError("not authenticated");
  }
  if (typeof decodedToken !== "string") {
    context.req.userId = decodedToken.userId;
  } else {
    throw new AuthenticationError("not authenticated");
  }
  return true;
};
