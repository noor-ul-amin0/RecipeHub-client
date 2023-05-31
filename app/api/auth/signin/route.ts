import { verifyPassword } from "@/lib/auth";
import { connectDatabase } from "@/lib/db";
import User from "@/models/user";
import { Responses } from "@/utils/API_Responses";

export const POST = async (request:Request) => {
  const { email, password } = await request.json();
  if (!email || !password)
    return Responses._400({
      message: "Missing email or password",
      success: false,
    });
  try {
    await connectDatabase();
    const user = await User.findOne({ email }).select(
      "+password -createdAt -updatedAt -__v"
    );
    if (!user || !(await verifyPassword(password, user.password))) {
      return Responses._400({
        success: false,
        message: "Invalid email or password",
      });
    }
    delete user.password;
    return Responses._200({ success: true, data: user });
  } catch (error: any) {
    return Responses._500({ success: false, message: error.message });
  }
};
