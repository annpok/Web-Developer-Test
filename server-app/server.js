import express from 'express';
import cors from 'cors';
import { connectToServer } from './config/db.js'
import basket from './routes/basket.js';
import products from './routes/products.js';

const app = express();
const port = 8000;
const corsOptions = {
  origin: '*',
  methods: [
    'GET',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],
  allowedHeaders: [
    'Content-Type',
    'Authenticate'
  ],
};

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/basket', basket);
app.use('/products', products);

connectToServer();

app.listen(port, () => {
  console.log('Server running port = ' + port);
});



