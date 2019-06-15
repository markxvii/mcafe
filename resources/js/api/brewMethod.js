import {ROAST_CONFIG} from '../config.js';

export default {
    /*
     GET   /api/v1/brew-methods
     */
    getBrewMethods() {
        return axios.get(ROAST_CONFIG.API_URL + '/brew-methods');
    }
}
