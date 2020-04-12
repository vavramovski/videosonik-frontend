import axios from '../axios/custom-axios';


const Repository = {


    getAllProducts: async () => {
        return await axios({
            method: 'get',
            url: '/products'
        }).then(x => {
            // console.log(x.data);
            return x.data;
        });
    },
    getCartProducts: async () => {
        return await axios({
            method: 'get',
            url: '/cart',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }).then(x => {
            // console.log(x.data);
            return x.data;
        });
    },
    Login: async (username, pass) => {
        return axios({
            method: 'post',
            url: '/authenticate',
            data: {username: username + "", pass: pass + ""}
        }).then(response => {
            // console.log(x.data);
            localStorage.setItem("token", response.data.token);

        })
            .catch(function () {
                localStorage.setItem("token", "fail");
            });
    },
    getWishlist: ()=>{
        return  axios({
            method: 'get',
            url: '/wishlist',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }).then(x => {
            // console.log(x.data);
            return x.data;
        });
    },
    getSingleProduct: (id)=>{
        return  axios({
            method: 'get',
            url: '/products/'+id,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }).then(x => {
            // console.log(x.data);
            return x.data;
        });
    },
    postContact: (contactData) => {
        return axios({
            method: 'post',
            url: '/contact/send',
            data: contactData
        });
    },
    getAllContacts: ()=>{
        return  axios({
            method: 'get',
            url: '/contact/all',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }).then(x => {
            return x.data;
        });
    }

};
export default Repository