import {ROAST_CONFIG} from "../config";

export default {
    getCafes() {
        return axios.get(ROAST_CONFIG.API_URL + '/cafes');
    },

    getCafe(cafeID) {
        return axios.get(ROAST_CONFIG.API_URL + '/cafes/' + cafeID);
    },
    postAddNewCafe(name,address,city,state,zip) {
        return axios.post(ROAST_CONFIG.API_URL+'/cafes',{
            name,
            address,
            city,
            state,
            zip
        })
    }
}
