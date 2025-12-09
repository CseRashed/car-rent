import { Router } from "express";
import { authController } from "./auth.controller";

const router=Router()

router.post('/signup',authController.userRegistration)
router.post('/signin',authController.userLogin)

export const authRoutes=router
