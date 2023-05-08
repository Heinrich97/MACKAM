import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {
        data: Buffer,
        contenType:String, 
    },
    category:{type: String, required: true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    rating: {type: Number, required: false},
    numberReviews: {type: Number, required: false},
    countInStock: {type: Number, required: true, default: false},
    description: {type: String, required: false},
    originalname: {type: String, required: true},
});
const Product = mongoose.model('product',productSchema);
export default Product;
