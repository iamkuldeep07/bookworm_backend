import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
    cron.schedule("*/30 * * * * ", async () => {
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            const borrowers = await Borrow.find({
                dueDate: {
                    $lt: oneDayAgo,
            },
            returnDate: null,
            notified: false,
        });

        for(const element of borrowers) {
            if(element.user && element.user.email){
                sendEmail({
                    email: element.user.email,
                    subject: "Book Return Reminder",
                   message: `Dear ${element.user.name},\n\nWe hope you're enjoying your reading! This is a friendly reminder that the book you borrowed is now overdue. Kindly return it to the library at your earliest convenience to avoid any penalties.\n\nIf you have already returned the book, please disregard this message.\n\nThank you for your cooperation.\n\nBest regards,\nBOOKWORM LIBRARY`
                });
                element.notified = true;
                await element.save();
            }
        }
        } catch(error) {
            console.error("Some error occured while notifying users.", error);
        };
        
    });
};