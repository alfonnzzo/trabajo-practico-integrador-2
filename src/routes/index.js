import { Router } from "express";
import userRoutes from "../routes/user.routes.js";
import authRouter from "../routes/auth.routes.js";
import articlesRoutes from "../routes/articles.routes.js";
import tagRoutes from "../routes/tag.routes.js";   
import commentRouter from "../routes/comment.routes.js";

const routerIndex = Router();

routerIndex.use("/api", userRoutes);
routerIndex.use("/api", authRouter);
routerIndex.use("/api", articlesRoutes);
routerIndex.use("/api", tagRoutes);
routerIndex.use("/api", commentRouter);
export default routerIndex;