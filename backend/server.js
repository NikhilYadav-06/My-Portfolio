const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./Routes/ContactRoutes");
const adminRoutes = require("./Routes/AdminRoutes");

const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// Contact API

app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Portfolio Backend is Running "
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully ");
        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error ");
        console.log(error.message);
    });