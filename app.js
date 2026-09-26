import dotenv from "dotenv";
import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDb from "./db/config.js";
import routerAdmin from "./routes/AdminRoute.js";
import routerManager from "./routes/ManagerRoute.js";

dotenv.config({path:"./.env"});
const app = express();

app.use(express.json());

app.use("/admin",routerAdmin);
app.use("/manager",routerManager);

const port = process.env.PORT || 5001;

app.get("/",(req,res)=>{
    res.status(200).json({message:"hello from server...!"});
})

app.use((req,res,next)=>{
    next(new HttpError("route not found",404));
})

app.use((err,req,res,next)=>{
    if(res.headersSent){
        next(err);
    }
    res.status(err.statusCode || 500).json({message:err.message || "internal server error"});
})

async function startServer(){
    try {
        await connectDb();
        app.listen(port,()=>{
            console.log(`server running on ${port}`)
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
startServer();