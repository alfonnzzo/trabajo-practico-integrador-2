import { Router } from "express";
import { 
    createComment,
    getComments,
    getCommentsById,
    updateComments,  
    deleteComments

 } from "../controllers/comments.controller.js";
import { commentValidations } from "../middlewares/validations/comment.validator.js";
import { applyValidations } from "../middlewares/applyValidation.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { AdminMiddleware } from "../middlewares/admin.middlewares.js";
import { ownerMiddleware } from "../middlewares/owner.middlewares.js";

const commentRouter = Router();


commentRouter.post("/comments", authMiddleware, commentValidations, applyValidations, createComment)
commentRouter.get("/comments", authMiddleware, commentValidations, applyValidations, getComments)
commentRouter.get("/comments/:id", authMiddleware, commentValidations, applyValidations, getCommentsById)
commentRouter.put("/comments/:id", AdminMiddleware, ownerMiddleware, commentValidations, applyValidations, updateComments)
commentRouter.delete("/comments/:id", AdminMiddleware, ownerMiddleware, commentValidations, applyValidations, deleteComments)

export default commentRouter;