import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"



// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB(); // Ensure this is called to establish the database connection

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads')) // Serve static files from the 'uploads' directory

app.get("/", (req, res) => {
  res.send("API working")
})

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`)
} )