const proxy = require('http-proxy-middleware');
//const DATACENTER_URL = 'http://localhost:7080/datacenter';
const DATACENTER_URL = 'http://139.196.123.44/datacenter_api';
module.exports = function(app) {
    app.use(proxy('/api',
        {
            target: `${DATACENTER_URL}/api`,
            changeOrigin: true,
            pathRewrite: {
                '^/api' : function(path, req){
                    return path.replace(/^\/api/, '');
                }
            },
        }
    ));
    app.use(proxy('/file-server',
        {
            target: `${DATACENTER_URL}`,
            changeOrigin: true,
            pathRewrite: {
                '^/file-server' : function(path, req){
                    return path.replace(/^\/file-server/, '');
                }
            }
        }
    ))
}