import { connectDatabase } from "@/lib/db";
import User from "@/models/user";

export const POST = async (request) => {
  const { email, password, fullName } = await request.json();
  if (!email || !password || !fullName) {
    return new Response("Missing fields", { status: 400 });
  }
  try {
    await connectDatabase();
    const user = await User.findOne({ email });
    if (user) {
      return new Response("Email already exists!", { status: 400 });
    }
    await User.create({
      email,
      password,
      fullName,
    });
    return new Response(null, { status: 201 });
  } catch (error) {
    return new Response("Failed to register user" + error, { status: 500 });
  }
};
