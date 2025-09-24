import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema ({
  content: { 
    type: String,   
    minlength: 5,             
    maxlength: 500,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
  },
  article: {
    type: Types.ObjectId,
    ref: "Article",
  },
})

export const CommentModel = model("Comment", CommentSchema);
