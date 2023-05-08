import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderItems: [
                    {
                    name:  {type: String, required: true},
                    image: {
                        data: Buffer,
                        contenType:String, 
                    },
                    price: {type: Number, required: true},
                    qty:   {type: Number, required: true},
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true,
                        },
                    },
                ],
                user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
                userName: {type: String, required: false},
                userEmail: {type: String, required: false},
                shipping:{
                    address: String,
                    city: String,
                    postalCode: String,
                    country: String,
                },
                payment:{
                    paymentMethod: String,
                    paymentResult:{
                            orderID: String,
                            payerID: String,
                            paymentID: String,
                    },
                },
                itemsPrice: Number,
                shippingPrice: Number,
                taxPrice: Number,
                totalPrice: Number,
                isPaid: {type: Boolean, required: true, default: false},
                paidAt: Date,
                isDelivered: {type: Boolean, required: true, default: false},
                deliveredAt: Date,
            },
        {
            timestamps: true,   
    });
const Order = mongoose.model('Order',orderSchema);
export default Order;