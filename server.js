import express from "express"
import cors from "cors"
import { conn } from "./conn.js"
import auth from "./routes/auth.js"
import crud from "./routes/crud.js"

const app = express()
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "https://todoosh-phi.vercel.app",
     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}
))
await conn()
app.get('/', (req, res) => {
    res.send("hello sahil")
})
app.use(express.json())
app.use("/api/v1", auth)
app.use("/api/v2", crud)

app.listen(port, () => {
    console.log("server running at port:3000")
})