import { connectDatabase } from "@/lib/db";
import Recipe from "@/models/recipe";
import { Responses } from "@/utils/API_Responses";

export const GET = async (_) => {
  try {
    await connectDatabase();
    const recipes = await Recipe.find();
    return Responses._200({ success: true, data: recipes });
  } catch (error) {
    return Responses._500({ success: false, message: error.message });
  }
};
