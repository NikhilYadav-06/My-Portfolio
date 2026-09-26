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
            message: "Message saved successfully "
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
            message: "Server error ❌"
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