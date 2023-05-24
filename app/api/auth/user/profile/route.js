import { connectDatabase } from "@/lib/db";
import User from "@/models/user";
import { Responses } from "@/utils/API_Responses";
import isEmpty from "lodash/isEmpty";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const filter = {};
  searchParams.forEach((value, key) => {
    filter[key] = value;
  });
  if (isEmpty(filter))
    return Responses._400({ success: false, message: "Something went wrong" });

  try {
    await connectDatabase();
    const user = await User.findOne(filter);
    if (!user)
      return Responses._404({ success: false, message: "User not found" });
    return Responses._200({ success: true, data: user });
  } catch (error) {
    return Responses._500({ success: false, message: error.message });
  }
};
export const PUT = async (request) => {
  const { _id, ...rest } = await request.json();
  if (!_id || !rest)
    return Responses._400({ success: false, message: "Missing ID or body" });

  try {
    await connectDatabase();
    delete rest.email;
    const user = await User.findByIdAndUpdate(_id, rest, {
      new: true,
      runValidators: true,
    });
    if (!user)
      return Responses._404({ success: false, message: "User not found" });
    return Responses._200({ success: true, data: user });
  } catch (error) {
    return Responses._500({ success: false, message: error.message });
  }
};
