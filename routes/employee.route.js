import express from "express";

import { createEmployee, deleteEmployee, getEmployee, updateEmployee, allEmployees } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", allEmployees);
router.post("/", createEmployee);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;