import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // Switch to 587 instead of 465
        secure: false, // Must be false for 587 (it upgrades to secure via STARTTLS)
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        family: 4 // Still crucial to force IPv4
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message,
    };

    await transporter.sendMail(mailOptions);
};
