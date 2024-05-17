const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
      required: false,
    },
    otp: {
      type: Number,
      requried: false,
      default: null,
    },
    resetToken: {
      type: String,
      default: null,
    },
    expirationTime: {
      type: Date,
      default: null,
    },
    bgTheme: {
      type: String,
      default: "32,44,51",
      required: false,
    },
    textColor: {
      type: String,
      default: "#ffffff",
      required: false,
    },
    chatBG: {
      type: String,
      default: "32,44,51",
      required: false,
    },
    chatImage: {
      type: String,
      default:
        "https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/background.jpg?raw=true",
      required: false,
    },
    requests: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
