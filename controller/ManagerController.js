import Manager from "../model/Manager.js"; 
import HttpError from "../middleware/HttpError.js";

const createManager = async (req, res,next) => {
    try {
        const { name, email, salary, designation, status } = req.body;

        const existingManager = await Manager.findOne({ email });

        if (existingManager) {
            return res.status(400).json({ message: "Manager with this email already exists." });
        }

        const newManager = new Manager({
            name,
            email,
            salary,
            designation,
            status,
        });

        const savedManager = await newManager.save();

        res.status(201).json({message:"manager created successfully...!",savedManager});

    } catch (error) {
        next(new HttpError(error.message,500));
    }
};

const getAllManagers = async (req, res,next) => {
    try {
        const managers = await Manager.find({});
        res.status(200).json({message:"manager fetched successfully...!",managers});
    } catch (error) {
        next(new HttpError(error.message,500));    }
};

const getManagerById = async (req, res,next) => {
    try {
        const manager = await Manager.findById(req.params.id);
        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }
        res.status(200).json({message:"manager fetched successfully...!",manager});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
};

const updateManager = async (req, res,next) => {
    try {
        const updateData = {
            ...req.body,
            updated_date: new Date().toISOString(),
        };

        const updatedManager = await Manager.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedManager) {
            return res.status(404).json({ message: "Manager not found" });
        }
        res.status(200).json({message:"manager updated successfully...!",updateManager});

    } catch (error) {
        next(new HttpError(error.message,500));
    }
};

const deleteManager = async (req, res,next) => {
    try {
        const deletedManager = await Manager.findByIdAndDelete(req.params.id);
        if (!deletedManager) {
            return res.status(404).json({ message: "Manager not found" });
        }
        res.status(200).json({ message: "Manager deleted successfully" });
    } catch (error) {
        next(new HttpError(error.message,500));
    }
};

export default {createManager,getAllManagers,getManagerById,updateManager,deleteManager}