import express from "express";
import rungraph from "../services/graph.ai.service.js"
import type { Request, Response } from "express";



export const invokeGraph = async (req: Request,res: Response)=>{
    try{
        const {input} = req.body;
        console.log(req.body)
        const result = await rungraph(input);
        res.status(200).json({
            success:true,
            result
        })
    }
    catch(error){
        console.error("Error invoking graph:", error);
        res.status(500).json({
            success:false,
            message:"An error occurred while processing your request."
        })
    }
}