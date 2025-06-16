import express from "express"
import cors from "cors"
import { conn } from "./conn.js"
import auth from "./routes/auth.js"
import crud from "./routes/crud.js"

const app = express()
const port = process.env.PORT || 3000;

// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//    credentials: false
// };

// ✅ Apply CORS middleware
// app.use(cors());
app.use((req, res, next) => {
  // Always set these headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.use(express.json())
await conn()
app.get('/', (req, res) => {
    res.send("hello sahil")
})
app.use("/api/v1", auth)
app.use("/api/v2", crud)

app.listen(port, () => {
    console.log("server running at port:3000")
})