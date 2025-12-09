import { pool } from "../../config/db";


const userRegistration=async(name:string, email:string, password:string, phone:string, role:string)=>{
const result = await pool.query(
            `INSERT INTO users (name,email,password,phone,role) 
             VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [name, email, password, phone, role || "customer"]
        );
        return result
}

const userLogin=async(email:string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return result
}

export const authService ={
    userRegistration,userLogin
}