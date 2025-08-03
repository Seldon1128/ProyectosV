import pool from "../libs/database.js";
import { comparePassword, hashedPassword } from "../libs/index.js";

export const getUser = async(req, res) => {
    try {
        const {userId} = req.user;

        const userExist = await pool.query({
            text: `SELECT * FROM tbluser WHERE id = $1`,
            values: [userId],
        });

        const user = userExist.rows[0]

        if(!user){
            return res.status(404).json({status: "failed", message: "User not found."});
        }

        user.password = undefined;

        res.status(201).json({status:"succes",user,});

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"failed", message: error.message});
    }
};

export const changePassword = async(req, res) => {
    try {
        const {userId} = req.user;

        const {currentPassword, newPassword, confirmPassword} = req.body;

        const userExist = await pool.query({
            text: `SELECT * FROM tbluser WHERE id = $1`,
            values: [userId],
        });

        const user = userExist.rows[0];

        if (!user){
            return res.status(404).json({status:"failed", message:"User not found."});
        }

        if (newPassword !== confirmPassword){
            return res.status(401).json({status:"failed", message:"New Passwords does not match.",});
        }
        
        const isMatch = await comparePassword(currentPassword, user?.password);

        if(!isMatch){
            return res.status(401).json({status:"failed", message:"Invalid current password."});
        }

        const hashed = await hashedPassword(newPassword);

        await pool.query({
            text: `UPDATE tbluser SET password = $1 WHERE id = $2`,
            values: [hashed, userId],
        });

        res.status(200).json({status:"succes", message: "Password changed successfully",});

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"failed", message: error.message});
    }
};

export const updateUser = async(req, res) => {
    try {
        const {userId} = req.user;
        const {firstname, lastname, country, currency, contact} = req.body;

        const userExist = await pool.query({
            text: `SELECT * FROM tbluser WHERE id = $1`,
            values: [userId],
        });

        const user = userExist.rows[0];

        if (!user){
            return res.status(404).json({status:"failed", message:"User not found."});
        }

        const updatedUser = await pool.query({
            text: `UPDATE tbluser SET firstname = $1, lastname = $2, country = $3, currency = $4, 
            contact = $5, updatedat = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *`,
            values: [firstname, lastname, country, currency, contact, userId],
        });

        updatedUser.rows[0].password = undefined;

        res.status(200).json({status:"succes", message:"User information updated successfully", user: updatedUser.rows[0],});

    } catch (error) {
        console.log(error);
        res.status(500).json({status:"failed", message: error.message});
    }
};