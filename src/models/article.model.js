import { Schema, model, Types } from "mongoose";

const ArticleSchema = new Schema ({
  title: { 
    type: String,             
    required: true,           
    minlength: 3,             
    maxlength: 200,             
  },
  content: { 
    type: String,             
    required: true,           
    minlength: 50,             
  },
  excerpt: { 
    type: String,             
    required: true,           
    maxlength: 500,  
    required: false,           
  },
  status: {
    type: String,
    enum: {
      values: ["published", "archived"],
    },
    default: "published",
  },
  author: [{
    type: Types.ObjectId,
    ref: "User",
  }],
  tags: [{
    type: Types.ObjectId,
    ref: "Tag",
  }],
})

export const ArticleModel = model("Article", ArticleSchema);