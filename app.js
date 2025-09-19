import express from "express";
import { connectDB } from "./src/config/database.js";
import "dotenv/config";
import { userRoutes } from "./src/routes/user.routes.js";

const app = express();
app.use(express.json());

app.use("/api", userRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log("Servidor corriendo en puerto "+PORT);
})

connectDB();