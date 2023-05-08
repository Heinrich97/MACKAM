import { getProducts } from "../api";
import DashboardMenu from "../components/DashboardMenu";
import { hideLoading, showLoading } from "../utils";

const ListOfProductsScreen = {
    after_render: async () =>{
        document.getElementById('add-product')
        .addEventListener('click', async (e) =>{
            e.preventDefault();
            document.location.hash = '/addproduct';
        });
    },
    render: async() =>{
        showLoading();
        const response = await getProducts()
        hideLoading();
        if (!response) {
            return '<div>Error getting data</div>';
        }
        // eslint-disable-next-line no-unused-vars
        const products = response
        return `
        <div class="productslist">
        ${DashboardMenu.render({selected:'product'})}
        <div  class="products-list">
            <h1>Products</h1>
            <div>
            <button class="btn btn-danger" id="add-product" style="background-color: green; color: white">Add Product</button>
                </div>
                <div>
                <table>
                        <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>CATEGORY</th>
                                <th>NAME</th>
                                <th>PRICE(N$)</th>
                                <th>STOCK COUNT</th>
                                <th>ACTIONS</th>
                            </tr>
                        <thead>
                        <tbody>
                        ${
                            products.length === 0 
                            ? `<tr><td colspan="6">No Products Found</tr>`
                            : products.map(
                                (product) =>`
                        <tr>
                            <td><img src="${`data:image/jpg;base64,${btoa(String.fromCharCode(...new Uint8Array((product.image.data.data))))}`}" alt="${product.name}"height="100" width="100"/></td>
                            <td>${product.category}</td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.countInStock}</td>
                            <td><a class="btn btn-warning" id="edit-product" style="background-color: orange; color: white" href="/#/updateproduct/${product._id}">EDIT</a></td>
                        </tr>`    
                            ).join('\n')}
                        </tbody>
                </table>
                </div>
        </div>
        `;
    },
};

export default ListOfProductsScreen;