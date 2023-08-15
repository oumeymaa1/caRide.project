const express = require ("express");

const app = express ();

require("dotenv").config();

const connectDB = require("./config/connectDB");
connectDB();

app.use(express.json());

app.use("/api/user", require ("./routes/user"))
app.use("/api/admin", require ("./routes/admin"))
app.use("/api/post", require ("./routes/post"))


const PORT = process.env.PORT;

app.listen(PORT, (err) =>
    err
    ? console.error(err)
    :console.log(`Server is running on port ${PORT} ...`)
);    
