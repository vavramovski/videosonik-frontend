import axios from '../axios/custom-axios';

const Repository = {


    getAllProducts: async () => {
        return await axios.get('/products');
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
        }).catch((resp) => {
            Repository.logout();
        });
    },
    Login: async (username, pass) => {
        return axios({
            method: 'post',
            url: '/authenticate',
            data: {username: username + "", pass: pass + ""}
        }).then(response => {
            localStorage.setItem("token", response.data.token);
        });
    },
    getWishlist: () => {
        return axios({
            method: 'get',
            url: '/wishlist',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }).then(x => {
            // console.log(x.data);
            return x.data;
        }).catch((resp) => {
            Repository.logout();
        });
    },
    getSingleProduct: (id) => {
        return axios({
            method: 'get',
            url: '/products/' + id,
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
        }).catch((resp) => {
            Repository.logout();
        });
    },
    getAllContacts: () => {
        return axios({
            method: 'get',
            url: '/contact/all',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }).then(x => {
            return x.data;
        }).catch((resp) => {
            Repository.logout();
        });
    },
    getAllReviewsForProduct: (product) => {
        return axios.get(
            '/review?productId=' + product).then(x => {
            console.log("REVIEWS");
            console.log(x);
            return x.data;
        }).catch((resp) => {
            Repository.logout();
        });
    },
    postReview: (review) => {
//todo: ne proagja ubavo requestov
        return axios({
            method: 'post',
            url: '/review',
            data: review,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).catch((resp) => {
            Repository.logout();
        });
    },
    postProduct: async (product) => {
//todo: ne proagja ubavo requestov
        return await axios({
            method: 'post',
            url: '/products/new',
            data: product,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),

            }
        });
    },
    patchProduct: async (product) => {
//todo: ne proagja ubavo requestov
        return await axios({
            method: 'patch',
            url: '/products/' + product.productid,
            data: product,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),

            }
        });
    },
    logout: () => {
        localStorage.removeItem("token");
        window.location = "/login";
    },
    processCart: () => {
        return axios({
            method: 'get',
            url: '/cart/process',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }).then(x => {
            return x.data;
        }).catch((resp) => {
            Repository.logout();
        });
    },
};
export default Repository