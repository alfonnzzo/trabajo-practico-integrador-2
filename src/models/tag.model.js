import { Schema, model } from "mongoose";

const TagSchema = new Schema ({
  name: { 
    type: String,   
    unique: true,          
    minlength: 2,             
    maxlength: 30,
    required: true,
    trim: true,
  },
    description: { 
    type: String,   
    maxlength: 200,
    required: false,
  },
})

export const TagModel = model("Tag", TagSchema);
