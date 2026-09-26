import express from "express";
import managerController from "../controller/ManagerController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/createManager",managerController.createManager)

router.get("/managers", auth, managerController.getAllManagers);

router.get("/managers/:id", auth, managerController.getManagerById);

router.put("/update/:id", auth, managerController.updateManager);

router.delete("/delete/:id", auth, managerController.deleteManager);

export default router;