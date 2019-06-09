// 此处定义API访问地址

var api_url = '';

switch( process.env.NODE_ENV ){
    case 'development':
        api_url = 'http://mcafe.test/api/v1';
        break;
    case 'production':
        api_url = 'http://markxvii.top';
        break;
}

export const ROAST_CONFIG = {
    API_URL: api_url,
}
