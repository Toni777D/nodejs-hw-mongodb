import {Schema, model} from "mongoose";
import { contactTypeList } from "../../constans/contacts.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite:{
        type: Boolean,
        default: false,
        required: true,
    },
    contactType:{
        type: String,
        enum: contactTypeList,
        required: true,
        default: "personal",
    }
}, {versionKey: false, timestamps: true})

const ContactCollection = model("contact", contactSchema);

export const sortFields = ["name", "phoneNumber", "email", "isFavourite", "contactType"]

export default ContactCollection;
