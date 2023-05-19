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
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 5,
      select: false,
    },
    profilePic: {
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
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 12);
  next();
});
//-------------------------------------------------------------------------------------------------------------
userSchema.methods.confirmPassword = async function (
  candidatePassword,
  savePassword
) {
  return await bcrypt.compare(candidatePassword, savePassword);
};
//-------------------------------------------------------------------------------------------------------------
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email,
  }).select("+password -createdAt -updatedAt");
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  delete user.password;
  return user;
};
//-------------------------------------------------------------------------------------------------------------
const User = models.User || model("User", userSchema);

export default User;
