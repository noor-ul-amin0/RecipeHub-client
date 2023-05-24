import { hashPassword } from "@/lib/auth";
import { connectDatabase } from "@/lib/db";
import User from "@/models/user";
import { Responses } from "@/utils/API_Responses";

export const POST = async (request) => {
  const { email, password, fullName } = await request.json();
  if (!email || !password || !fullName) {
    return Responses._400({ success: false, message: "Missing fields" });
  }
  try {
    await connectDatabase();
    const user = await User.findOne({ email });
    if (user) {
      return Responses._400({
        success: false,
        message: "Email already exists!",
      });
    }
    const hashedPassword = await hashPassword(password);
    await User.create({
      email,
      password: hashedPassword,
      fullName,
    });
    return Responses._201({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return new Response("Failed to register user" + error, { status: 500 });
  }
};
