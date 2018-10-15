const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/api',
        {
            target: 'http://localhost:7080/datacenter/api',
            changeOrigin: true,
            pathRewrite: {
                '^/api' : function(path, req){
                    return path.replace(/^\/api/, '');
                }
            },
        }
    ));
}