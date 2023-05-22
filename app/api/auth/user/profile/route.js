import { connectDatabase } from "@/lib/db";
import User from "@/models/user";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  if (!email) {
    return new Response("Something went wrong", { status: 400 });
  }
  try {
    await connectDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found!", { status: 404 });
    }
    return new Response(user, { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
