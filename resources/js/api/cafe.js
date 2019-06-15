import {ROAST_CONFIG} from "../config";

//这个模块便是请求api接口之功效，此接口会在vuex中调用。

export default {
    getCafes() {
        return axios.get(ROAST_CONFIG.API_URL + '/cafes');
    },

    getCafe(cafeID) {
        return axios.get(ROAST_CONFIG.API_URL + '/cafes/' + cafeID);
    },
    postAddNewCafe(name, address, city, state, zip, website, description, roaster, brewMethods,tags) {
        return axios.post(ROAST_CONFIG.API_URL + '/cafes', {
            name,
            address,
            city,
            state,
            zip,
            website,
            description,
            roaster,
            brewMethods,
            tags
        })
    },

    /**
     * POST  /api/v1/cafes/{cafeID}/like
     */
    postLikeCafe (cafeID) {
        return axios.post(ROAST_CONFIG.API_URL + '/cafes/' + cafeID + '/like');
    },

    /**
     * DELETE /api/v1/cafes/{cafeID}/like
     */
    deleteLikeCafe (cafeID) {
        return axios.delete(ROAST_CONFIG.API_URL + '/cafes/' + cafeID + '/like');
    }
}
