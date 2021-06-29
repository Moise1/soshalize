import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './server/routes';

dotenv.config();
const { MONGO_DB_URL } = process.env;

// Connect to MongoDB
mongoose.connect(
  MONGO_DB_URL,
  {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  
)
.then(res => console.log(`Database: ${res.connections[0].name} connected successfully.`))
.catch(err => console.log(`${err} broke connection to DB`));


const app = express();

// middleware usage.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(router);
app.use("*", (req, res) => res.status(405).json({
  status: 405,
  message: "Method Not Allowed!",
}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App listening on port ${port}`));