import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["contractor", "client", "staff", "super admin"],
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    // Check if password has been modified or is new
    if (!this.isModified("password")) {
      return next();
    }
    console.log(`got on pre save`);
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Replace plain password with hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export { User };
