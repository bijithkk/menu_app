import express from 'express';
import cors from "cors";
import 'dotenv/config';

import connectDB from './config/db.js';

import menuRouter from './routes/menuRoute.js';
import itemRouter from './routes/itemRoute.js';

//app config
const app = express();
const port = process.env.PORT || 6000;
connectDB();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/menu",menuRouter);
app.use("/api/item",itemRouter);


app.get('/', (req,res) => {
    res.send('API Working');
})

app.listen(port, () => console.log('Server started on PORT: '+port) );
