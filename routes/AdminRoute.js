import express from "express";
import AdminController from "../controller/AdminController.js";

const router = express.Router();

router.post("/registerAdmin",AdminController.registerAdmin);

router.get("/getAdminProfile",AdminController.getAdminProfile)

router.post("/login", AdminController.loginAdmin);

router.post("/logOut",AdminController.logoutAdmin);

router.post("/logOutAll",AdminController.logoutAllAdmins)

export default router;