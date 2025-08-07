const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const db = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");


app.use(express.json());
app.use("/api/schools", schoolRoutes);


const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
