import { pool } from "../../config/db"

const createBooking = async (
    customer_id: string,
    vehicle_id: string,
    rent_start_date: string,
    rent_end_date: string
) => {

    const existCustomer = await pool.query(
        `SELECT id FROM users WHERE id=$1`, [customer_id]
    );
    if (existCustomer.rows.length === 0) {
        return { error: "Customer not found" };
    }

    const ExistVehicle = await pool.query(
        `SELECT * FROM vehicles WHERE id=$1`, [vehicle_id]
    );
    if (ExistVehicle.rows.length === 0) {
        return { error: "Vehicle not found" };
    }

    const vehicle = ExistVehicle.rows[0];

    const checkBooking = await pool.query(
        `SELECT * FROM bookings 
         WHERE vehicle_id=$1 AND status='active'
         AND (rent_start_date <= $3 AND rent_end_date >= $2)`,
        [vehicle_id, rent_start_date, rent_end_date]
    );

    if (checkBooking.rows.length > 0) {
        return { error: "Vehicle already booked for these dates" };
    }

    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total_price = totalDays * vehicle.daily_rent_price;

    const result = await pool.query(
        `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
        VALUES($1,$2,$3,$4,$5,'active') 
        RETURNING id, customer_id, vehicle_id,
        TO_CHAR(rent_start_date,'YYYY-MM-DD') AS rent_start_date,
        TO_CHAR(rent_end_date,'YYYY-MM-DD') AS rent_end_date,
        total_price, status`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
    );

    return {
        ...result.rows[0],
        vehicle: {
            vehicle_name: vehicle.vehicle_name,
            daily_rent_price: vehicle.daily_rent_price
        }
    };
}

const getAllBookings = async () => {
    const result = await pool.query(`SELECT * FROM bookings`)
    return result
}



export const bookingService = {
    createBooking, getAllBookings
}




