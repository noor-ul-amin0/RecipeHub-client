import User from "@/models/user";
import { hash, compare } from "bcryptjs";
import { connectDatabase } from "./db";
import isEmpty from "lodash/isEmpty";

export async function createUser(fullName, email, password) {
  const response = await fetch("/api/auth/register", {
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

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
