import express from "express";
import { connectDB } from "./src/config/database.js";
import "dotenv/config";
import { userRoutes } from "./src/routes/user.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";       


const app = express();
app.use(express.json());
app.use(cors({
origin: "http://localhost:5173",
credentials: true // CRUCIAL: permitir cookies
}));
app.use(cookieParser()); // NECESARIO: para leer req.cookies


app.use("/api", userRoutes)
app.use ("/api/auth", authRouter)

const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log("Servidor corriendo en puerto "+PORT);
})

connectDB();