import { Addproduct, getProduct, removeProduct } from "../api";
import { hideLoading, parseRequestUrl, showLoading, showMessage } from "../utils";


const UpdateProductScreen = {
    after_render: async () => {
  
        const productform = document.getElementById('product-form')
        productform.addEventListener('submit', async (e) =>{
            e.preventDefault();
            const formdata = new FormData(productform);
            const data = await Addproduct(formdata)
            if(data.error) {
                showMessage(data.error)
            }else{
                document.location.hash = '/productlist';
            }
        });

        document.getElementById('remove-product')
        .addEventListener('click', async (e) =>{
            e.preventDefault();
            const request = parseRequestUrl();
            const data = await removeProduct(request.id);
            if(data.error){
                showMessage(data.error)
            }else{
                document.location.hash = '/productlist';
                showMessage(data)
            }
            
        });
    },
    
    render:async () =>{
        const request = parseRequestUrl();
        showLoading();
        const product = await getProduct(request.id);
        if (product.error){
            hideLoading();
            return `<br><div class="center">${product.error}</div>`
        }
        hideLoading();
        return `
        <div class = "form-container">
            <form id = "product-form">
                <ul class="form-items">
                    <li>
                        <h3>Upadate Product</h3>
                    </li>
                    <li>
                        <input type="file" name="testImage" id="testImage" accept="image/png, image/jpg"/>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" value="${product.name}"/>
                    </li>
                    <li>
                        <label for="brand">Brand</label>
                        <input type="text" name="brand" id="brand" value="${product.brand}"/>
                    </li>
                    <li>
                        <label for="category">Category</label>
                        <input type="text" name="category" id="category" value="${product.category}"/>
                    </li>
                    <li>
                        <label for="price">Price</label>
                        <input type="text" name="price" id="price" value="N$ ${product.price}"/>
                    </li>
                    <li>
                        <label for="countInStock">Count In Stock</label>
                        <input type="text" name="countInStock" id="countInStock" value="${product.countInStock}"/>
                    </li>
                    <li>
                        <button type="submit" class="primary">Update</button>
                    </li>
                    <li>
                    <button class="btn btn-danger" id="remove-product" style="background-color: red; color: white">DELETE</button>
                </li>
                </ul>
            </form>
        </div>
        `;
    },
};
export default UpdateProductScreen;
