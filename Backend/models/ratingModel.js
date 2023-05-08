import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    product_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true,},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user: {type: String, required: false},
});
const Rating = mongoose.model('Rating',ratingSchema);
export default Rating;