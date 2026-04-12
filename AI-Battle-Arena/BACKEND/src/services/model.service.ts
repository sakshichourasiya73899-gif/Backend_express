import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai"
import { ChatCohere } from "@langchain/cohere"
import apiconfig from "../config/config.js";

export const googleGmini = new ChatGoogle({
  apiKey: apiconfig.GEMINI_API_KEY,
  model: "gemini-flash-latest",

});

export const mistral = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: apiconfig.MISTRAL_API_KEY
})


export const cohere = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: apiconfig.COHERE_API_KEY
})

    