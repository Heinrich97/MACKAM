import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Rating from '../models/ratingModel';
import { isAuth } from '../utils';

const ratingRouter = express.Router();
ratingRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async(req, res) => {
        const rating = new Rating ({
            product_ID: req.body.product_ID,
            rating: req.body.rating,
            comment: req.body.comment,
            user: req.body.user,
        });
        const createdrating = await rating.save();
        res.status(201).send({ message: 'Comment Received', order: createdrating})
    })
);
export default ratingRouter;