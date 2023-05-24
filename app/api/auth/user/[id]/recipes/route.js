import { connectDatabase } from "@/lib/db";
import Recipe from "@/models/recipe";
import { Responses } from "@/utils/API_Responses";

export const GET = async (_, { params: { id } }) => {
  try {
    await connectDatabase();
    const recipes = await Recipe.find({ creator: id });
    return Responses._200({ success: true, data: recipes });
  } catch (error) {
    return Responses._500({ success: false, message: error.message });
  }
};
export const POST = async (request) => {};
export const PUT = async (request) => {};
export const DELETE = async (request) => {};
