import { Router } from "express";
import { 
    
    createComment,
    getComments,
    getCommentsById,
    updateComments,  
    deleteComments

 } from "../controllers/comments.controller.js";
import { commentIdValidation } from "../middlewares/validations/comment.validator.js";
import { applyValidations } from "../middlewares/applyValidation.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { AdminMiddleware } from "../middlewares/admin.middlewares.js";
import { ownerMiddleware } from "../middlewares/owner.middlewares.js";

const commentRouter = Router();


commentRouter.post("/comments", authMiddleware, applyValidations, createComment)
commentRouter.get("/comments", authMiddleware, applyValidations, getComments)
commentRouter.get("/comments/:id", commentIdValidation, authMiddleware, applyValidations, getCommentsById)
commentRouter.put("/comments/:id", commentIdValidation, authMiddleware, AdminMiddleware, ownerMiddleware, applyValidations, updateComments)
commentRouter.delete("/comments/:id", commentIdValidation, authMiddleware, AdminMiddleware, ownerMiddleware, applyValidations, deleteComments)

export default commentRouter;