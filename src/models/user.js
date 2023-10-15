import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Why no firstname?"],
    },
    lastname: {
      type: String,
      required: [true, "Why no lastname?"],
    },
    email: {
      type: String,
      required: [true, "Why no email?"],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Why no password?"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
    mobile: {
      type: String,
      unique: true,
      minLength: [10, "no should have minimum 10 digits"],
      maxLength: [10, "no should have maximum 10 digits"],
      match: [/\d{10}/, "no should only have digits"],
    },
    refreshToken: [String],
  },
  {
      toJSON: {
          transform(doc, ret) {
              delete ret.password;
              delete ret.__v;
          }
      },
  },
  {
      timestamps: true
  }
  );

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  // Hash the password with cost of 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();

});
const User = mongoose.model("User", userSchema);

export default User;
