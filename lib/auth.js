import { hash, compare } from "bcryptjs";

export async function createUser(fullName, email, password) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Email already exists!");
    } else {
      throw new Error("Something went wrong!");
    }
  }

  return response;
}

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function getUserByEmail(email) {
  const response = await fetch(`/api/auth/user?email=${email}`);

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const user = await response.json();
  return user;
}
