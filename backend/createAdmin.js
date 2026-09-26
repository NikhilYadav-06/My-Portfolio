const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected ✅");

        const existingAdmin = await Admin.findOne({
            username: "Dhruv"
        });

        if (existingAdmin) {
            console.log("Admin already exists ✅");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("dhruv", 10);

        const admin = new Admin({
            username: "Dhruv",
            password: hashedPassword
        });

        await admin.save();

        console.log("Admin Created Successfully ✅");
        console.log("Username: Dhruv");
        console.log("Password: dhruv");

        process.exit();

    } catch (error) {
        console.log("Error ❌");
        console.log(error.message);
        process.exit(1);
    }
}

createAdmin();