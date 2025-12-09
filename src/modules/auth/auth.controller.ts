import { Request, Response } from "express";
import { authService } from "./auth.service";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt from "jsonwebtoken"
const userRegistration= async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const lowerEmail = email.toLowerCase();

        const result = await authService.userRegistration(name,lowerEmail,hashedPassword,phone,role)
        const user = result.rows[0];
        delete user.password

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const userLogin=async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & Password required"
            });
        }

        const lowerEmail = email.toLowerCase();

        const result = await authService.userLogin(lowerEmail)

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            config.jwtSecret as string,
            { expiresIn: '6d' }
        );

        delete user.password;
        res.status(200).json({
            success: true,
            message: "Login successful",
            data:{
                 token,user
            }
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const authController={
    userRegistration,userLogin
}