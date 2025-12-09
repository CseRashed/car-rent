import { pool } from "../../config/db"

const getUser = async () => {
    const result = await pool.query(`SELECT *FROM users`)
    return result
}

const getSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
    return result
}

const updateUser = async (id: string, body: any) => {
    const currentUser = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    if (currentUser.rows.length === 0) {
        return null;
    }

    const oldData = currentUser.rows[0];

    const newData = {
        name: body.name ?? oldData.name,
        email: body.email?.toLowerCase() ?? oldData.email,
        phone: body.phone ?? oldData.phone,
        role: body.role ?? oldData.role,
    };


    const result = await pool.query(
        `UPDATE users 
     SET name=$1, email=$2, phone=$3, role=$4
     WHERE id=$5 RETURNING id,name,email,phone,role`,
        [newData.name, newData.email, newData.phone, newData.role, id]
    );

    return result
};


const deleteUser=async(id:string)=>{
    const result =await pool.query(`
     DELETE FROM users WHERE id =$1`,[id])
     return result
}



export const userService = {
    getUser, getSingleUser, updateUser,deleteUser
}