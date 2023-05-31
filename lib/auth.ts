import User from "@/models/user";
import { hash, compare } from "bcryptjs";
import { connectDatabase } from "./db";
import isEmpty from "lodash/isEmpty";

export async function signUp(fullName:string, email:string, password:string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message);
  }
  return response;
}
export async function findUser(fields = {}) {
  if (isEmpty(fields)) throw new Error("Something went wrong");
  await connectDatabase();
  const user = await User.findOne(fields);
  if (!user) throw new Error("User not found");
  return user;
}

export async function hashPassword(password:string): Promise<string>{
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password:string, hashedPassword:string): Promise<boolean> {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
