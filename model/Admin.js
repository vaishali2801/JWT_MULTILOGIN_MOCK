import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
    {
        username: {
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

        password: {
            type: String,
            required: true,
        },

        status: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            default: "admin"
        },

        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: false,
    }
);
adminSchema.pre("save", async function () {
    const admin = this;

    if (admin.isModified("password")) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }
});
adminSchema.statics.findByCredentials = async function (email, password) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new Error("Unable to login");
    }
    const isMatched = await bcrypt.compare(
        password,
        admin.password
    );
    if (!isMatched) {
        throw new Error("Unable to login");
    }
    return admin;
};
adminSchema.methods.generateAuthToken = async function () {
    try {
        const admin = this;
        const token = jwt.sign(
            {
                _id: admin._id.toString(),
                role: admin.role
            },
            process.env.JWT_SECRET
        );
        admin.tokens = admin.tokens.concat({ token });
        await admin.save();
        return token;
    } catch (error) {
        throw new Error(error);
    }
}

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;