import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"

const auth = (...roles:string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization

            if (!token) {
                return res.status(500).json({ message: 'user are not allowed' })
            }
            const decode = jwt.verify(token, config.jwtSecret as string)as JwtPayload
            req.user = decode ;

            if(roles.length && !roles.includes(decode.role as string)){
                return res.status(500).json({
                    message:'unauthorize access'
                })
            }
            next()
        } catch (error: any) {
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}

export default auth