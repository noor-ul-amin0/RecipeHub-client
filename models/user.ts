import validator from "validator";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      minlength: 3,
      trim: true,
      required: [true, "Please provide your fullname"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: () => "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 5,
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/plants-era/image/upload/v1608101836/users/default_sntew1.jpg",
    },
  },
  {
    timestamps: true,
  }
);
//-------------------------------------------------------------------------------------------------------------
const User = models?.User || model("User", userSchema);

export default User;
