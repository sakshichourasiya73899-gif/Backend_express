import{StateGraph,StateSchema,START,END ,type GraphNode ,type CompiledStateGraph} from "@langchain/langgraph";
import z from "zod"
import { googleGmini,mistral,cohere } from "./model.service.js";
import { createAgent, HumanMessage , providerStrategy } from "langchain";


const state = new StateSchema({
    problem: z.string().default(""),
    solution_1:z.string().default(""),
    solution_2:z.string().default(""),
    judge:z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning:z.string().default(""),
        solution_2_reasoning:z.string().default("")
    })
})

const solutionNode: GraphNode<typeof state> = async (state)=>{
    const[mistralResponse,cohereResponse] = await Promise.all([
        mistral.invoke(state.problem),
        cohere.invoke(state.problem)
    ])
    return{
        solution_1:mistralResponse.text,
        solution_2:cohereResponse.text
    }
}

const judgeNode: GraphNode<typeof state> = async (state)=>{
     const{problem, solution_1,solution_2} = state
    const judge = createAgent({
        model:googleGmini,
        responseFormat:providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_reasoning:z.string(),
            solution_2_reasoning:z.string()
        })),
        systemPrompt:`You are a judge tasked with evaluating two solutions to the following problem: ${problem}.
Evaluate each solution based on its effectiveness, creativity, and feasibility. Provide a score between 0 and 10 for each solution, along with a detailed reasoning for your scores.`
    })
    const judgeResponse = await judge.invoke({
        messages:[
           new HumanMessage(`
            Problem: ${problem}
            Solution 1: ${solution_1}
            Solution 2: ${solution_2}
            please evaluate the two solutions and provide scores and reasoning for each.
           `)
        ]
    })
    const{
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning
    }= judgeResponse.structuredResponse

    return{
        judge:{
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    }
   
}   
 const graph = new StateGraph(state)
    .addNode("solution",solutionNode)
    .addNode("judge_Node",judgeNode)
    .addEdge(START,"solution")
    .addEdge("solution","judge_Node")
    .addEdge("judge_Node",END)
    .compile()

    export default async function(problem: string){
        const result = await graph.invoke({
            problem:problem
        })
        return result;
    }

    


