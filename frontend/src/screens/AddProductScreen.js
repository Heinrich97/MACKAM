import { Addproduct } from "../api";
import { showMessage } from "../utils";


const AddProductScreen = {
    after_render: () =>{
  
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
    },
    render: () =>{
        return `
        <div class = "form-container">
            <form id = "product-form">
                <ul class="form-items">
                    <li>
                        <h3>Add Product</h3>
                    </li>
                    <li>
                        <input type="file" name="testImage" id="testImage" accept="image/png, image/jpg"/>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name"/>
                    </li>
                    <li>
                        <label for="brand">Brand</label>
                        <input type="text" name="brand" id="brand"/>
                    </li>
                    <li>
                        <label for="category">Category</label>
                        <input type="text" name="category" id="category"/>
                    </li>
                    <li>
                        <label for="price">Price</label>
                        <input type="text" name="price" id="price"/>
                    </li>
                    <li>
                        <label for="countInStock">Count In Stock</label>
                        <input type="text" name="countInStock" id="countInStock"/>
                    </li>
                    <li>
                        <button type="submit" class="primary">Upload</button>
                    </li>
                </ul>
            </form>
        </div>
        `;
    },
};
export default AddProductScreen;
