import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';


const SpecificProductRouter = express.Router();

SpecificProductRouter.get(
    '/:id',
    expressAsyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.send(product);
        } else {
            res.status(401).send({
                message: 'You have no products listed',
            });
        }
        
    })
);
SpecificProductRouter.delete(
    '/:id',
    expressAsyncHandler(async(req, res) => {
        const response = await Product.findByIdAndDelete(req.params.id)
       
        if (!response){
            res.status(401).send({
                message: 'Product Not Deleted',
            });
        }
        else{
            res.send({message: `Deleted : ${ response.name}`});

        }
    })
);
SpecificProductRouter.put(
    '/:id',
    expressAsyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id)
        const numberReviews = product.numberReviews + 1
        const rating = product.rating + req.body.rating / numberReviews
        if (product) {
            const saveProduct = await Product.findOneAndUpdate(req.params.id,{rating:rating,numberReviews:numberReviews},{
                new: true
            })
            res.send(saveProduct);
        } else {
            res.status(401).send({
                message: 'Rating not submitted',
            });
        }
        
    })
);
export default SpecificProductRouter;