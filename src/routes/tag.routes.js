import { Router } from "express";
import {
    createTag,
    getTags,
    getTagsById,
    updateTags,
    deleteTags
} from "../controllers/tag.controller.js";  

const tagRoutes = Router()  

tagRoutes.post ("/tags", createTag)
tagRoutes.get ("/tags", getTags)
tagRoutes.get ("/tags/:id", getTagsById)
tagRoutes.put ("/tags/:id", updateTags)
tagRoutes.delete ("/tags/:id", deleteTags)  

export default tagRoutes;