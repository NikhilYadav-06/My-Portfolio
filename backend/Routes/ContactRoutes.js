const nodemailer = require("nodemailer");
const express = require("express");
const Contact = require("../models/Contact");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();


// TEST ROUTE
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Contact route is working "
    });
});


// POST - Save contact message
router.post("/", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        const contact = new Contact({
            name,
            email,
            message
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully "
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error "
        });

    }

});


// GET - Get all messages
router.get("/", authMiddleware, async (req, res) => {

    try {

        const contacts = await Contact
            .find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            contacts: contacts
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error "
        });

    }

});
// POST - Reply to contact message
router.post("/reply", authMiddleware, async (req, res) => {

    try {

        const { contactId, reply } = req.body;

        // Validate input
        if (!contactId || !reply || !reply.trim()) {
            return res.status(400).json({
                success: false,
                message: "Contact ID and reply are required"
            });
        }

        // Find original contact message
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found"
            });
        }

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send reply email
        await transporter.sendMail({
            from: `"Nikhil Portfolio" <${process.env.EMAIL_USER}>`,
            to: contact.email,
            subject: `Re: Message from Nikhil Portfolio`,
            text: reply.trim()
        });

        // Save reply in MongoDB
        contact.reply = reply.trim();
        contact.replied = true;
        contact.repliedAt = new Date();

        await contact.save();

        res.json({
            success: true,
            message: "Reply sent successfully"
        });

    } catch (error) {

        console.log("REPLY ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send reply"
        });

    }

});

// DELETE - Delete message
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const contact =
            await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {

            return res.status(404).json({
                success: false,
                message: "Message not found "
            });

        }

        res.json({
            success: true,
            message: "Message deleted successfully "
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error "
        });

    }

});


module.exports = router;