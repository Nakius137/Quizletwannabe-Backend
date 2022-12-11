"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            auth: {
                user: "m.lawniczak@tkhtechnology.com",
                pass: "Qap89583",
            },
        });
        const info = yield transporter.sendMail({
            from: "m.lawniczak@tkhtechnology.com",
            to: "j.runowicz@tkhtechnology.com",
            subject: "Halloo",
            text: "Emailniczak????",
            html: "<b>Emailniczak????</b>",
        });
        transporter.sendMail(info, (err, info) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(info.response);
        });
    }
    catch (err) {
        console.error(err);
    }
});
exports.default = mailer;
