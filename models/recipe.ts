import validator from "validator";
import { Schema, model, models } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: function (v:string) {
          return validator.isURL(v);
        },
        message: () => "Please provide a valid thumbnail url",
      },
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = models?.Recipe || model("Recipe", recipeSchema);

export default Recipe;
