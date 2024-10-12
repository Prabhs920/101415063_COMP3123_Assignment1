import mongoose from "mongoose";
import Employee from "../models/employee.model.js"

export const allEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        console.log("error in fetching Employees:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createEmployee = async(req, res) => {
    const employee = req.body; // user will send this data

    if (!employee.first_name || !employee.email || !employee.position || !employee.salary || !employee.department || !employee.date_of_joining) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newEmployee = new Employee(employee);
    const date = new Date();
    newEmployee.created_at = date;
    newEmployee.updated_at = date;

    try {
        await newEmployee.save();
        res.status(201).json({ 
            success: true,
            message: "employee created successfully",
            _id: newEmployee.id  
        });
    } catch (error) {
        console.error("Error in Create employee:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getEmployee = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid employee Id" });
    }

    try {
        const employee = await Employee.findById(id);

        if(employee){
            res.status(200).json({ success: true, data: employee });
        }
        else{
            res.status(200).json({ success: false, message: "Invalid employee Id"});
        }
    } catch (error) {
        console.log("error in fetching Employees:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.params;

    const employee = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid employee Id" });
    }

    try {
        const date = new Date();
        employee.updated_at = date;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, { new: true });
        res.status(200).json({ success: true, message:"employee updated successfully", data: updatedEmployee });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid employee Id" });
    }

    try {
        await Employee.findByIdAndDelete(id);
        res.status(204).json({ success: true, message: "employee deleted" });
    } catch (error) {
        console.log("error in deleting employee:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};