import express from "express";
import { connectDB } from "./src/config/database.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import routerIndex from "./src/routes/index.js";      


const app = express();
app.use(express.json());
app.use(cors({
origin: "http://localhost:5173",
credentials: true // CRUCIAL: permitir cookies
}));
app.use(cookieParser()); // NECESARIO: para leer req.cookies
app.use(routerIndex);


const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log("Servidor corriendo en puerto "+PORT);
})

connectDB();