
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import UserRoutes from "./UserRoutes.js"



const app = express() // to run express fro whole app
const PORT =3030;  //port number to run server

// middle ware 
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(bodyParser.json()) //Middleware to parse JSON
app.use('/api', UserRoutes);

// mongoDB connection
mongoose.connect("mongodb://localhost:27017")

// to verify the connection with mongoDB
const db=mongoose.connection;
db.on("open",()=>{
    console.log("Connected successfully ✅")  //connected means
})

// if not connected
db.on("error",()=>{
    console.log("Connection is failed ❌")
})



//--------START server running-----------
app.listen(PORT, () => {
    console.log(`🚨 Server running at http://localhost:${PORT}`);
});

