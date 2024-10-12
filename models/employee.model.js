import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        date_of_joining: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee; 