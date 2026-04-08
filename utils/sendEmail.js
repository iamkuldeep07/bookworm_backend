import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        connectionTimeout: 10000, 
        greetingTimeout: 10000,
        socketTimeout: 10000,
        // Force IPv4
        family: 4 
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Email send failed:", error);
        throw error;
    }
};
