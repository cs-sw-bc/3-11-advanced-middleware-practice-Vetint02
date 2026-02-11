import express from 'express';
import mongoose from 'mongoose';
import chalk from "chalk"
import enrollment from './routes/enrollmentRoute.js';

const app = express();
const MONGO_URL = "mongodb://localhost:27017/";

mongoose.connect(MONGO_URL)
    .then( () => console.log("Connection to MONGO DB is successful"))
    .catch(error => console.log("Error: ", error));

// app-level custom middleware
// logging all requests
app.use((req, res, next) => {

    // color the log based on the request method
    const method = req.method;
    let color = chalk.blue;
    if (method === "GET")
    {
        color = chalk.green;
    }
    if (method === "POST")
    {
        color = chalk.yellow;
    }

    // log the request method, url, and timestamp
    const timestamp = new Date().toLocaleDateString(`en-us`, {
        year: `numeric`,
        month: `2-digit`,
        day: `2-digit`,
        hour: `2-digit`,
        minute: `2-digit`,
        seconds: `2-digit`,
        hour12: false //use 24-hour clock
    });
    console.log(color(`${req.method} ${req.url} received at ${timestamp}`));
    next(); //forces the request to go to the next stage (another middleware or the end)
});

// Route to enrollment
app.use("/enrollment", enrollment);
app.listen(3000, () => console.log('Server is running on port 3000'));