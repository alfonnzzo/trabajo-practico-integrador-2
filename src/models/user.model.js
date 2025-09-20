import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
  username: { 
    type: String,             
    minlength: 3,             
    maxlength: 200,             
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /.+\@.+\..+/      
  },
  password: { 
    type: String, 
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
    },
    default: "user",
  },
  profile: {
      firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      biography: {
        type: String,
        maxlength: 500,
        required: false,
      },
      avatarUrl: {
        type: String,
        match: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/,
      },
      birthDate: {
        type: Date,
        required: false,
      },
    },
  articles: {
    type: Types.ObjectId,
    ref: "Article",
  },

});

export const UserModel = model("User", UserSchema);
