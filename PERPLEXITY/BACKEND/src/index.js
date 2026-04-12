
console.log("STARTING...");
import readline from 'readline/promises';
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage,tool,createAgent } from "langchain";
import sendEmail from '../src/services/sendEmail.js';
import * as z from 'zod';




const emailTool = tool(
    sendEmail,{
        name:"emailTool",
        description:"A tool to send email. It accepts an object with the following properties: to, subject, text, html. The 'to' property is the email address of the recipient. The 'subject' property is the subject of the email. The 'text' property is the plain text body of the email. The 'html' property is the HTML body of the email.",
        schema: z.object({
            to:z.string().describe("The email address of the recipient"),
            subject:z.string().describe("The subject of the email"),
            text:z.string().describe("The plain text body of the email"),
            html:z.string().describe("The HTML body of the email"),

        })
    }
)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



const model = new ChatMistralAI({
model: "mistral-small-latest",

temperature: 0
});

const agent = createAgent({
    model,
    tools: [ emailTool ]
})

const messages = []
while(true){
const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")
 messages.push(new HumanMessage(userInput))
 const response = await agent.invoke({messages});
 messages.push(response.messages[response.messages.length - 1])
 console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[response.messages.length - 1].content}`);
}


 
 rl.close();