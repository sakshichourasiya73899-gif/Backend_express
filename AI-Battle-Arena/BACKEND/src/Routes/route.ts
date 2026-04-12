import { Router } from "express";
const router = Router();
import { invokeGraph } from "../Controller/controller.js";


router.post("/invoke",invokeGraph) 
export default router;


