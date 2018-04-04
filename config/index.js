var path = require('path')

moudule.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'//生产环境
        },
        index: path.resolve(__dirname, '../elm/index.html'),//编译输入的index.html文件
        assetRoot: path.resolve(__dirname, '../elm'),//编译打包输出的静态资源路径
        assetsSubDirectory : 'static',//打包输出的二级目录
        assetsPublicPath: '/',//编译打包发布的根目录，可配置为资源服务器域名或cdn域名
        productionSourceMap: true,//是否开启csssourceMap
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        produtionGzip: false,//是否开启gzip
        produtionGzipExtensions:['js', 'css']//需要gzip压缩的文件扩展名
    },
    dev:{
        env: {
            NODE_ENV: '"development"'//开发环境
        },
        port: 8000,//开发调试端口
        assetsSubDirectory: 'static',//编译输出的二级目录
        assetsPublicPath: '/',//编译打包发布的根目录，可配置为资源服务器域名或cdn域名
        context: [
            '/shopping',
            '/ugc',
            '/v1',
            '/v2',
            '/v3',
            '/v4',
            '/bos',
            '/member',
            '/promotion',
            '/eus',
            '/payapi',
            '/m.ele.me@json',
        ],
        proxypath: 'https://mainsite-restapi.ele.me',//代理
        cssSourceMap:false// 是否开启 cssSourceMap(因为一些 bug 此选项默认关闭，详情可参考 https://github.com/webpack/css-loader#sourcemaps)
    }
}