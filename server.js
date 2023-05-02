const express = require('express');
const cors = require('cors');
const connectDB = require("./db");
const dotenv = require("dotenv");

// Routes
const userRouter = require("./routes/userRoute");
const marksRouter = require("./routes/markRoute");
const materialsRoute = require("./routes/materialRoute");
const scheduleRoute = require("./routes/scheduleRoute");
const staffRouter = require("./routes/staffRoute");

const app = express();
app.use(cors());
app.use(express.json());

// Your API routes will go here
dotenv.config();
connectDB()

app.use('/api/user', userRouter)
app.use('/api/marks', marksRouter)
app.use('/api/materials', materialsRoute)
app.use('/api/schedule', scheduleRoute)
app.use('/api/staff', staffRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
