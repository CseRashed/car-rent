import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle=async(req:Request,res:Response)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=req.body;
    try{
        const result =await vehicleService.createVehicle(vehicle_name,type,registration_number,daily_rent_price,availability_status)
        res.status(200).json({
            success:true,
            message:'Vehicle created successfully',
            data:result.rows[0]
        })
        
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getAllVehicle=async(req:Request,res:Response)=>{
    try{
        const result =await vehicleService.getAllVehicle()
        res.status(200).json({
            success:true,
            message:'Vehicles retrieved successfully',
            data:result.rows
        })

    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getSingleVehicle=async(req:Request,res:Response)=>{
 try {
        const result = await vehicleService.getSingleVehicle(req.params.id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No vehicles found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Vehicle retrieved successfully',
                data: result.rows[0]
            })
        }
    }catch(error:any){
    res.status(500).json({
        success:false,
        message:error.message
    })
 }
}

const updateVehicle=async(req:Request,res:Response)=>{
try{
    const result=await vehicleService.updateVehicle(req.params.id as string,req.body) 
    res.status(200).json({
        success:true,
        message:'Vehicle updated successfully',
        data:result?.rows[0]
    })
}catch(error:any){
    res.status(200).json({
        success:false,
        message:error.message
    })
}
}

const deleteVehicle=async(req:Request,res:Response)=>{
 try{
    const result =await vehicleService.deleteVehicle(req.params.id as string)
    res.status(200).json({
        success:true,
        message:'Vehicle deleted successfully'
    })
 }catch(error:any){
    res.status(500).json({
        success:false,
        message:error.message
    })
 }
}

export const vehicleController={
    createVehicle,getAllVehicle,getSingleVehicle,updateVehicle,deleteVehicle
}