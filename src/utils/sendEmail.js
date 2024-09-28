import nodemailer from "nodemailer";
import {SMTP} from "../constans/index.js";
import {env} from "./env.js";

const transporter = nodemailer.createTransport({
    host: env(SMTP.SMTP_HOST),
    port: Number(env(SMTP.SMTP_PORT)),
    auth: {
        user: env(SMTP.SMTP_USER),
        pass: env(SMTP.SMTP_PASSWORD),
    },
});

export const sendEmail = async (options) => {
    // const email = {...data, from: env(SMTP.SMTP_FROM)}
    return transporter.sendMail(options);

}


