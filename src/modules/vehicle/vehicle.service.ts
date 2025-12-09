import { pool } from "../../config/db"

const createVehicle=async(name:string,type:string,registration:string,price:string,status:string)=>{
    const result =await pool.query(`
        INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,[name,type,registration,price,status])

        return result
}

const getAllVehicle=async()=>{
    const result =await pool.query(`SELECT * FROM vehicles`)
    return result 
}

const getSingleVehicle=async(id:string)=>{
    const result =await pool.query(`SELECT * FROM vehicles WHERE id=$1`,[id])
    return result
}

const updateVehicle = async (id: string, body: any) => {
    const currentVehicle = await pool.query("SELECT * FROM vehicles WHERE id=$1", [id]);

    if (currentVehicle.rows.length === 0) {
        return null;
    }

    const oldData = currentVehicle.rows[0];

    const newData = {
        vehicle_name: body.vehicle_name ?? oldData.vehicle_name,
        type: body.type?.toLowerCase() ?? oldData.type,
        registration_number: body.registration_number ?? oldData.registration_number,
        daily_rent_price: body.daily_rent_price ?? oldData.daily_rent_price,
        availability_status: body.availability_status ?? oldData.availability_status
    };


    const result = await pool.query(
     `UPDATE vehicles 
     SET vehicle_name=$1, type=$2, registration_number=$3,daily_rent_price=$4, availability_status=$5
     WHERE id=$6 RETURNING vehicle_name,type,registration_number,daily_rent_price,availability_status`,
        [newData.vehicle_name, newData.type, newData.registration_number, newData.daily_rent_price,newData.availability_status, id]
    );

    return result
};

const deleteVehicle=async(id:string)=>{
 const result =await pool.query(`DELETE FROM vehicles WHERE id=$1`,[id])
 return result
}

export const vehicleService={
    createVehicle,getAllVehicle,getSingleVehicle,updateVehicle,deleteVehicle
}