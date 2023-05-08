import { getProducts } from '../api';
import rating from '../components/Rating';
import { getSearch } from '../localStorage';
import { hideLoading, showLoading } from '../utils';

const HomeScreen = {

    after_render: async () =>{
        
    },
    
    render: async () => {
        showLoading();
        const response = await getProducts()
        hideLoading();
        if (!response) {
            return '<div>Error getting data</div>';
        }
        const date = new Date().toUTCString().slice(5, 16);
        console.log(date)
        const allproducts = response
        const filteredProducts = allproducts.filter(product => {
            const searchString = getSearch()
            return product.name.includes(searchString) || product.category.includes(searchString);
     })
        const products = response?filteredProducts:""
        return `
        <ul class="products">
            ${products.map(
            (product) =>`
            <li>
                <div class="product">
                    <a href="/#/product/${product._id}">
                    <img src="${`data:image/jpg;base64,${btoa(String.fromCharCode(...new Uint8Array((product.image.data.data))))}`}" alt="${product.name}"/>
                    </a>
                <div class="product-name">
                    <a href="/#/product/1">
                        ${product.name}
                    </a>
                </div>
                <div class="product-rating">
                    ${rating.render({
                        value: product.rating,
                        text: `${product.numberReviews} reviews`,
                    })}
                </div>
                    <div class="product-brand">
                    ${product.brand}
                    </div>
                <div class="product-price">
                    N$ ${product.price}
                </div>  
                </div>
            </li>
            `,
        )
                .join('\n')}
    `;
    },
};
export default HomeScreen;
