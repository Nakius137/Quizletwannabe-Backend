import nodemailer from "nodemailer";

const mailer = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      auth: {
        user: "m.lawniczak@tkhtechnology.com",
        pass: "Qap89583",
      },
    });

    const info = await transporter.sendMail({
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
  } catch (err) {
    console.error(err);
  }
};

export default mailer;
