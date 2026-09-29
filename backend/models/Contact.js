const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    // Admin reply
    reply: {
        type: String,
        default: ""
    },

    // Reply status
    replied: {
        type: Boolean,
        default: false
    },

    // Reply date
    repliedAt: {
        type: Date,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Contact", contactSchema);