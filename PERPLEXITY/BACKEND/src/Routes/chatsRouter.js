import { sendMessages,getChats,getMessages,deleteChat} from "../Controllers/chats.controller.js";
import {authUser} from "../Middleware/authMiddleware.js"
import { Router } from "express";
const chatsRouter = Router()
//"/api/chats/messages"
chatsRouter.post("/messages",authUser,sendMessages)
chatsRouter.get("/chat",authUser,getChats)
chatsRouter.get("/:chatId/messages",authUser,getMessages)
chatsRouter.delete("/delete/:chatId",authUser,deleteChat)

export default chatsRouter