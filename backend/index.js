import express from "express"
import { executeCode } from "./code-execute.js"
import cors from "cors"
import { codeReview } from "./code-review.js"

const app = express()
app.use(cors({
    origin:'*'
}))
app.use(express.json())
app.post("/execute",executeCode)
app.post("/code-review",codeReview)

app.listen(3000,()=>{
    console.log("server is listening on Port:3000");
})