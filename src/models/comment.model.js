import { Schema, model } from "mongoose";

const CommentSchema = new Schema ({
  content: { 
    type: String,   
    minlength: 5,             
    maxlength: 500,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: "User",
  },
  article: {
    type: ObjectId,
    ref: "Article",
  },
})

export const CommentModel = model("Comment", CommentSchema);
