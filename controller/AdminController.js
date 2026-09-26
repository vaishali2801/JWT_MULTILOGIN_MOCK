import HttpError from "../middleware/HttpError.js";
import Admin from "../model/Admin.js";

const registerAdmin = async (req, res,next) => {
    try {
        const { username, email, password, role } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Email is already in use." });
        }
        const admin = new Admin({ username, email, password, role });
        
        await admin.save();

        const token = await admin.generateAuthToken();
        res.status(201).json({ message:"admin created successfully...!",admin, token });
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
};

const loginAdmin = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findByCredentials(email, password);

        const token = await admin.generateAuthToken();

        res.status(200).json({ message: "login successfully...!", admin, token });
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
};

const getAdminProfile = async (req, res,next) => {
    try {
        const admin = await Admin.find({});
        if(!admin){
            return next(new HttpError("admin not found",404));
        }
        res.status(200).json({message:"successfully get admin profile",admin});
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
};

const logoutAdmin = async (req, res,next) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((t) => t.token !== req.token);
        await req.admin.save();
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
};

const logoutAllAdmins = async (req, res,next) => {
    try {
        req.admin.tokens = [];
        await req.admin.save();
        res.status(200).json({ message: "Logged out from all devices" });
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
};
export default {registerAdmin,loginAdmin,getAdminProfile,logoutAdmin,logoutAllAdmins}
