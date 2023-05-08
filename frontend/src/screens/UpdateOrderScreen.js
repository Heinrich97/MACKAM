import { getOrder, removeOrder} from "../api";
import { hideLoading, parseRequestUrl, showLoading, showMessage } from "../utils";


const UpdateOrderScreen = {
    after_render: async () => {

        document.getElementById('remove-order')
        .addEventListener('click', async (e) =>{
            e.preventDefault();
            const request = parseRequestUrl();
            const data = await removeOrder(request.id);
            if(data.error){
                showMessage(data.error)
            }else{
                document.location.hash = '/orderlist';
                showMessage(data)
            }
            
        });
    },
    
    render:async () =>{
        const request = parseRequestUrl();
        showLoading();
        const order = await getOrder(request.id);
        if (order.error){
            hideLoading();
            document.location.hash = '/orderlist';
        }
        showLoading();
        return `
        <div class = "form-container">
            <form id = "product-form">
                <ul class="form-items">
                    <li>
                        <h3>Update Order Info</h3>
                    </li>
                    <li>
                        <label for="name">Order Item Name</label>
                        <input type="text" name="name" id="name" value="${order.orderItems[0].name}" disabled/>
                    </li>
                    <li>
                        <label for="price">Order Item Price</label>
                        <input type="text" name="price" id="price" value="N$ ${order.orderItems[0].price}" disabled/>
                    </li>
                    <li>
                        <label for="qty">Qty</label>
                        <input type="text" name="qty" id="qty" value="${order.orderItems[0].qty}" disabled/>
                    </li>
                    <li>
                    <label for="price">Order Total Price</label>
                    <input type="text" name="price" id="price" value="N$ ${order.totalPrice}" disabled/>
                </li>
                    <li>
                        <label for="isDelivered">Delivered</label>
                        <input type="text" name="isDelivered" id="isDelivered" value="${order.isDelivered}"/>
                    </li>
                    <li>
                        <label for="isPaid">Payment Method</label>
                        <input type="text" name="isPaid" id="isPaid" value="${order.payment.paymentMethod}" disabled/>
                    </li>
                    <li>
                        <label for="isPaid">Paid</label>
                        <input type="text" name="isPaid" id="isPaid" value="${order.isPaid}"/>
                    </li>
                    <li>
                        <button type="submit" class="primary">Update</button>
                    </li>
                    <li>
                    <button class="btn btn-danger" id="remove-order" style="background-color: red; color: white">Remove</button>
                </li>
                </ul>
            </form>
        </div>
        `;
    },
};
export default UpdateOrderScreen;
