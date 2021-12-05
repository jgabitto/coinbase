import mongoose, { Schema, model, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser {
  username: string;
  password: string;
  email: string;
  currencies: object[];
  generateAuthToken: () => string;
  findByCredentials: (email: string, password: string) => IUser;
}

interface UserModel extends Model<IUser> {
  generateAuthToken: () => string;
  findByCredentials: (email: string, password: string) => IUser;
}

const userSchema = new Schema<IUser, UserModel>();

userSchema.static("generateAuthToken", async function generateAuthToken() {
  const user: any = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    `${process.env.JWT_SECRET}`
  );

  return token;
});

userSchema.static(
  "findByCredentials",
  async function findByCredentials(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    return user;
  }
);

userSchema.pre<IUser>("save", async function (next) {
  const user: any = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = model<IUser, UserModel>("User", userSchema);

export { User };

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Please enter a password"],
//     trim: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: [true, "Please enter an email"],
//     trim: true,
//     lowercase: true,
//     validate(value: any) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   currencies: [
//     {
//       currency: {
//         type: String,
//       },
//     },
//   ],
// });

// userSchema.methods.generateAuthToken = async function () {
//   const user = this;

//   const token = jwt.sign(
//     { _id: user._id.toString() },
//     `${process.env.JWT_SECRET}`
//   );

//   return token;
// };

// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("Unable to login");
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Unable to login");
//   }
//   return user;
// };

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

// const User = mongoose.model("User", userSchema);
