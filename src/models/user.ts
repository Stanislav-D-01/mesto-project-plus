import mongoose from "mongoose";
import validator from "validator";

interface Iuser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<Iuser>({
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v: string) => validator.isEmail(v),
  },
  password: {
    type: String,
    required: true,
    unique: true,
    select: false,
  },
});

export default mongoose.model<Iuser>("user", userSchema);
