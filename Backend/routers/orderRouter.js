import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuth } from '../utils';

const orderRouter = express.Router();
orderRouter.get(
    '/orders',
    expressAsyncHandler(async(req, res) => {
        const orders = await Order.find();
        if (orders) {
            res.send(orders);
        } else {
            res.status(401).send({
                message: 'You have no orders',
            });
        }
    })
);
orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const orders = await Order.find({user: req.user._id});
        if (orders) {
            res.send(orders);
        } else {
            res.status(401).send({
                message: 'You have no orders',
            });
        }
    })
);
orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(401).send({
                message: 'Order Not Found',
            });
        }
    })
);
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const order = new Order ({
            orderItems: req.body.orderItems,
            user: req.user._id,
            userName: req.body.name,
            userEmail: req.body.email,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).send({ message: 'Order Received', order: createdOrder})
    })
);


orderRouter.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const response = await Order.findByIdAndDelete(req.params.id)
       
        if (!response){
            res.status(401).send({
                message: 'order Not Deleted',
            });
        }
        else{
            res.send({message: `Deleted Order: ${ response._id}`});

        }
    })
);
export default orderRouter;