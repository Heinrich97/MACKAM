import express from 'express';
import multer from 'multer';
import fs from 'fs'
import Product from '../models/productModel';

const productRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
      cb(null,'./Backend/uploads/')
    },
    filename: (req,file,cb) => {
      cb(null,file.originalname)
    },
  });
  productRouter.get(
    '/products',
    async(req, res) => {

        const product = await Product.find();
        if (product) {
            res.send(product);
        } else {
            res.status(401).send({
                message: 'You have no products',
            });
        }
    }
);
  const upload = multer({storage:storage});
  productRouter.post(
    '/products',
    upload.single('testImage'),
    (req,res)=>{
        const saveProduct = new Product({
            name: req.body.name,
            image: {
                data: fs.readFileSync(`./Backend/uploads/${req.file.filename}`),
                contenType:"image/png", 
            },
            category:req.body.category,
            price: req.body.price,
            brand: req.body.brand,
            rating: 0,
            numberReviews: 0,
            description: req.body.description,
            countInStock: req.body.countInStock,
            originalname: req.file.originalname
        })
        saveProduct.save()
        if (saveProduct) {
            res.send('Product uploaded sucessfully');
        } else {
            res.status(401).send({
                message: 'Product Not Uploaded',
            });
        }
    },
  );
export default productRouter;