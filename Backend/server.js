import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import data from './data';
import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import SpecificProductRouter from './routers/SpecificProductRouter';
import emailRouter from './nodeMailer/mail';
import ratingRouter from './routers/ratingRouter';




mongoose
.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to mongodb');
})
.catch((error) => {
  console.log(error);
});

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/products', productRouter);
app.use('/api/product', SpecificProductRouter);
app.use('/api/placeorder', emailRouter);
app.get('/api/paypal/clientId', (req, res) => {
  res.send( {clientId: config.PAYPAL_CLIENT_ID});
});
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) =>{
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({message: err.message});
});
app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
