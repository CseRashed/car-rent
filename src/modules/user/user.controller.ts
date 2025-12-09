import { Request, Response } from "express"
import { userService } from "./user.secvice"

const getUser=async (req: Request, res: Response) => {
    const result = await userService.getUser()
    res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: result.rows
    })
}

const getSingleUser=async(req:Request,res:Response)=>{
    const id= req.params.id;
    try {
        const result = await userService.getSingleUser(req.params.id as string)
        const user= result.rows[0]
        delete user.password
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'User Featched successfully',
                data: user
            })
        }
    } catch (error: any) {

    }
}

const updateUser=async(req:Request,res:Response)=>{
    const id=req.params.id;
    try{
        const result =await userService.updateUser(id as string,req.body)
        res.status(200).json({
            success:true,
            message:'User updated successfully',
            data:result?.rows[0]
        })
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const deleteUser=async(req:Request,res:Response)=>{
    try{
    const result =await userService.deleteUser(req.params.id as string)
    if(result.rowCount===0){
      res.status(404).json({
        success:false,
        message:'User not found'
      })
    } else{
      res.status(200).json({
        success:true,
        message:'User deleted successfully'
      })
    } 
  }catch(error:any){

  }
}

export const userController={
    getUser,getSingleUser,updateUser,deleteUser
}