import { Schema, model } from "mongoose";
import { emailRegexp } from "../../constans/users.js";
import { handleSaveError, setUpdateOptions } from "./hooks.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateOptions);
userSchema.post("findOneAndUpdate", handleSaveError)

const UserCollection = model("user", userSchema);
export default UserCollection;
