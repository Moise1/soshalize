import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './server/routes';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL,
     {useNewUrlParser: true, useUnifiedTopology: true}, 
     () => console.log('MongoDB Connected...'));

const app = express();

// middleware useDebugValue
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(router);
app.use("*", (req, res) => res.status(405).json({
    status: 405,
    message: "Method Not Allowed!",
  }));

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`App listening on port ${port}`));