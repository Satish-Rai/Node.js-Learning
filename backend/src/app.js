import express from "express";

const app = express(); // create an express app

// parse response
app.use(express.json());

import router from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/users", router);

// example route : http://localhost:4000/api/v1/users/register

export default app;