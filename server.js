import express from 'express';
import mongoose from 'mongoose';
import chalk from "chalk"
import enrollment from './routes/enrollmentRoute.js';

const app = express();
const MONGO_URL = "mongodb://localhost:27017/SchoolDB";

mongoose.connect(MONGO_URL)
    .then( () => console.log("Connection to MONGO DB is successful"))
    .catch(error => console.log("Error: ", error));

app.use(express.json());
app.use(express.urlencoded());

// app-level custom middleware
// logging all requests
app.use((req, res, next) => {

    // color the log based on the request method
    const method = req.method;
    let color = chalk.green;

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

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.method}, ${req.url}`);
    error.status = 404;
    next(error);
});

// Error middleware
app.use((err, req, res, next) => {
    const error = err.status || 500;

    res.status(error).json({
        error: {
            message: err.message || "internal server error",
            status: error
        },
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));