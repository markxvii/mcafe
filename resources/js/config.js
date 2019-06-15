// 此处定义API访问地址

var api_url = '';
var app_url = '';
var gaode_maps_js_api_key = '3fadb66b531734511f716fb1f58a9d6b';

switch( process.env.NODE_ENV ){
    case 'development':
        api_url = 'http://mcafe.test/api/v1';
        app_url='http://mcafe.test';
        break;
    case 'production':
        api_url = 'http://markxvii.top';
        app_url='http://markxvii.top';
        break;
}

export const ROAST_CONFIG = {
    API_URL: api_url,
    APP_URL:app_url,
    GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
}
