import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js"
import publisherRoutes from "./routes/publisherRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import supplierRoutes from "./routes/supplierRoutes.js"

const { urlencoded } = bodyParser;

const app = express();
const port  = process.env.PORT || 7000;
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }))


//connect to the db
connectDB();

//base routes
app.use("/api/users", userRoutes)
app.use('/api/pusblisher', publisherRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/suppliers", supplierRoutes)



app.listen(port, () => {
    console.error("the server is running at the port http://localhost:7000");    
})