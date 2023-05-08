import axios from "axios"
import { apiUrl } from "./config"
import { getUserInfo } from "./localStorage";


export const getProducts = async () =>{
    try {
        const response = await axios({
            url: `${apiUrl}/api/products/products`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message)
      }
      return response.data;
    } catch(err){
        return { error: err.response ? err.response.data.message : err.message};   
    }
};

export const getProduct = async (id) =>{
    try {
        const response = await axios({
            url: `${apiUrl}/api/product/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message)
      }
      return response.data;
    } catch(err){
        console.log(err)
        return { error: err.response.data.message || err.message}
    }
};
export const signin = async ({email, password}) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });
      if(response.statusText !== 'OK'){
        throw new Error(response.data.message)
      }
      return response;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message};       
    }
};
export const register = async ({name, email, password}) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name,
                email,
                password,
            },
        });
      if(response.statusText !== 'OK'){
        throw new Error(response.data.message)
      }
      return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message};       
    }
};
export const update = async ({name, email, password}) => {
    try {
        const {_id, token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                name,
                email,
                password,
            },
        });
      if(response.statusText !== 'OK'){
        throw new Error(response.data.message)
      }
      return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message};       
    }
};
export const createOrder = async(order) =>{
    try {
        console.log(order)
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
            return response.data;
        }catch (err) {
            return { error: err.response ? err.response.data.message : err.message};    
    }
};
export const getOrder = async (id) =>{
    try {
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message)
      }
      return response.data;
    } catch(err){
        return { error: err.message }
    }
};
export const getMyOrders = async () =>{
    try {
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/mine`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message)
      }
      return response.data;
    } catch(err){
        return { error: err.response ? err.response.data.message : err.message};   
    }
};
export const getPaypalClientId = async () =>{
        const response = await axios({
            url: `${apiUrl}/api/paypal/clientId`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.statusText !== 'OK') {
        throw new Error(response.data.message)
        }
        return response.data;
};
export const Addproduct = async (formdata) => {
    try {
        console.log([...formdata])
        const response = await axios({
            url: `${apiUrl}/api/products/products`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formdata,
        });
        console.log([response])
      if(response.statusText !== 'OK'){
        throw new Error(response.data.message)
      }
      return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message};       
    }
};
export const placeOrder = async(order) =>{
    try {
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/placeorder/placeorder`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
            return response.data;
        }catch (err) {
            return { error: err.response ? err.response.data.message : err.message};    
    }
};

export const removeOrder = async(id) =>{
    try {
        const {token} = getUserInfo();
        const response = await axios.delete(`${apiUrl}/api/orders/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                data: id
            },
        );
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        console.log(response)
            return response.data;
        }catch (err) {
            return { error: err.response ? err.response.data.message : err.message};    
    }
};

export const removeProduct = async(id) =>{
    try {
        const {token} = getUserInfo();
        const response = await axios.delete(`${apiUrl}/api/product/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
            {
                data: id
            },
        );
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        console.log(response)
            return response.data;
        }catch (err) {
            return { error: err.response ? err.response.data.message : err.message};    
    }
};