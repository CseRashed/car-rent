import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

    try {
        const result = await bookingService.createBooking(
            customer_id, vehicle_id, rent_start_date, rent_end_date
        );

        if (!result) {
            return res.status(400).json({ success: false, message: "Booking could not be created" });
        }

        if ((result as any).error) {
            return res.status(400).json({ success: false, message: (result as any).error });
        }

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const getAllBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getAllBookings()
        res.status(200).json({
            success: true,
            message: 'Bookings retrieved successfully',
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const bookingController = {
    createBooking, getAllBookings
}


