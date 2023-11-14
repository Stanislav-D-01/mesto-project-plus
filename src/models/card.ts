import mongoose, { ObjectId } from "mongoose";

interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createAt: Date;
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: "String",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: "String",
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      default: [],
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>("card", cardSchema);
