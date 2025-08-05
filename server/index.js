import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenseRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app =express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then(() => console.log("Mongoose connected"))
.catch((err) => console.error("Mongo error",err));

app.use("/api/auth", authRoutes);
app.use("/api/expense",expenseRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is connected successfully ${PORT}`);
})