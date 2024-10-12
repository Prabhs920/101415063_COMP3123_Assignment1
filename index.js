import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import userRoute from "./routes/user.route.js"
import employeeRoutes from "./routes/employee.route.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/v1/user", userRoute);
app.use("/api/v1/emp/employees", employeeRoutes);

app.listen(5000, () =>{
    connectDB();
    console.log("server started at 5000");
})

// bQbZPGSiCxtJmhBh