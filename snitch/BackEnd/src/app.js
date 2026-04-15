import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from "./routes/auth.routes.js";


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/auth',authRouter);
export default app;