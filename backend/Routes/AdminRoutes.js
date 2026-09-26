const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

// =========================
// ADMIN LOGIN
// =========================
router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        console.log("Login Attempt:", username);

        const admin = await Admin.findOne({
            username: username
        });

        if (!admin) {

            return res.status(401).json({
                success: false,
                message: "Invalid Username or Password ❌"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Username or Password ❌"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                username: admin.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        console.log("Login Successful:", username);

        res.json({
            success: true,
            message: "Login Successful ✅",
            token: token
        });

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error ❌"
        });
    }
});


// =========================
// CHANGE USERNAME / PASSWORD
// =========================
router.put("/change-credentials", async (req, res) => {

    try {

        const {
            currentUsername,
            currentPassword,
            newUsername,
            newPassword
        } = req.body;

        const admin = await Admin.findOne({
            username: currentUsername
        });

        if (!admin) {

            return res.status(404).json({
                success: false,
                message: "Current username is incorrect ❌"
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            admin.password
        );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Current password is incorrect ❌"
            });
        }

        const existingAdmin = await Admin.findOne({
            username: newUsername,
            _id: { $ne: admin._id }
        });

        if (existingAdmin) {

            return res.status(400).json({
                success: false,
                message: "New username already exists ❌"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        admin.username = newUsername;
        admin.password = hashedPassword;

        await admin.save();

        res.json({
            success: true,
            message: "Username and password changed successfully ✅"
        });

    } catch (error) {

        console.log("CHANGE CREDENTIAL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Server error ❌"
        });
    }
});


module.exports = router;