import { GoogleGenAI } from "@google/genai";
import  "dotenv/config";


const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY });

export const codeReview = async (req,res) => {
    const {code} = req.body
    if(!code)return res.status(400).json({success:false,message:"Please Provide code"})
  try {
    // Get the model
    // Use `generateContent` for text-only prompts
    const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
        contents: `if any error explain whats wrong and how to fix it . otherwise just explain and also tell how to improve here is: ${code} `
    })

    // const content = result.response.text();
    res.status(200).json({ data:response.text });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Content generation failed" });
  }
};