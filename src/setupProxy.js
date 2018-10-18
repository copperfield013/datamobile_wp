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
    app.use(proxy('/file-server',
        {
            target: 'http://localhost:7080/datacenter/',
            changeOrigin: true,
            pathRewrite: {
                '^/file-server' : function(path, req){
                    return path.replace(/^\/file-server/, '');
                }
            }
        }
    ))
}