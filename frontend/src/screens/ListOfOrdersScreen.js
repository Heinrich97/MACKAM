import axios from "axios";
import DashboardMenu from "../components/DashboardMenu";


const ListOfOrdersScreen = {
    after_render: async () =>{

    },
    render: async() =>{
        const response = await axios({
            url: 'http://localhost:5000/api/orders/orders',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response || response.statusText !== 'OK') {
            return '<div>Error getting data</div>';
        }
        // eslint-disable-next-line no-unused-vars
        const orders = response.data;
        return `
        <div class="orders">
        ${DashboardMenu.render({selected:'orders'})}
        <div  class="orders-list">
            <h1>Orders</h1>
                <div class="profile-orders">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>USER</th>
                                <th>PAID AT</th>
                                <th>DELIVERED AT</th>
                                <th>ACTIONS</th>
                            </tr>
                        <thead>
                        <tbody>
                        ${
                        orders.length === 0 
                            ? `<tr><td colspan="6">No Orders Found</tr>`
                            : orders.map(
                                (order) =>`
                        <tr>
                            <td>${order._id}</td>
                            <td>${order.createdAt}</td>
                            <td>${order.totalPrice}</td>
                            <td>${order.userEmail}</td>
                            <td>${order.isPaid}</td>
                            <td>${order.isDelivered}</td>
                            <td><a class="btn btn-warning" id="edit-product" style="background-color: orange; color: white" href="/#/updateorder/${order._id}">EDIT</a></td>
                        </tr>`    
                            ).join('\n')}
                        </tbody>
                </table>
        </div>
        `;
    },
};

export default ListOfOrdersScreen;