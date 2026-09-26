import mongoose from "mongoose";

const managerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        salary: {
            type: String,
            required: true,
        },

        designation: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: Boolean,
            default: true,
        },

    },
    {
        timestamps: false,
    }
);

const Manager = mongoose.model("Manager", managerSchema);

export default Manager;