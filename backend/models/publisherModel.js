import mongoose from "mongoose";

const PublisherSchema = new mongoose.Schema({
  name:{ 
    type:String , 
    required: true 
  },
  contactInfo: {
    type: String, 
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Publisher", PublisherSchema);
