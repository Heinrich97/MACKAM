const DashboardMenu = {
    render: (props) =>{
        return `
        <div  class="dashboard-menu">
            <ul>
                <li class="${props.selected === 'dasboard' ? 'selected' : ''}">
                    <a href="/#/dashboard">Dashboard</a>
                </li>
                <li class="${props.selected === 'orders' ? 'selected' : ''}">
                    <a href="/#/orderlist">Orders</a>
                </li>
                <li class="${props.selected === 'product' ? 'selected' : ''}">
                    <a href="/#/productlist">Products</a>
                </li>
            </ul>
        </div>
        `;
    },
};

export default DashboardMenu;