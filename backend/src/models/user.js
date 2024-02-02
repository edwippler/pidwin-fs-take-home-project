import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  tokens: {type: Number},
  tossHistory: [{
    guess: String,
    coinToss: String,
    wager: Number,
    win: Boolean,
    timestamp: Number,
  }],
});

export default mongoose.model("User", userSchema);