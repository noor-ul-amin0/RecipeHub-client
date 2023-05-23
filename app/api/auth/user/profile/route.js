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
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
export const PUT = async (request) => {
  const { _id, ...rest } = await request.json();
  if (!_id || !rest) {
    return new Response(null, { status: 200 });
  }
  try {
    await connectDatabase();
    const user = await User.findByIdAndUpdate(_id, rest, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return new Response("User not found!", { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
