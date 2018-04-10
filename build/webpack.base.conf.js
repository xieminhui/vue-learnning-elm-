var path = require('path') //nodejs自带的文件路径插件
var config = require('../config')
var utils = require('./utils') //自定义插件
var projectRoot = path.resolve(__dirname, '../') //拼接成绝对路径

/* 将nodejs环境作为我们的编译环境*/
var env = process.env.NODE_ENV
/* 是否在dev环境下开启sourceMap， 在config/index.js可配置*/
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
/* 是否在production环境下开启sourceMap， 在config/index.js可配置*/
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
/* 最终是否使用 CSSSourceMap*/
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd


module.exports = {
    entry: {
        app: './src/main.js'//编译文件入口
    },
    output: {
        path: config.build.assetRoot,//编译输出的静态资源根路径
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath :  config.dev.assetsPublicPath, // 正式发布环境下编译输出的上线路径的根路径
        filename: '[name].js' //编译输出的文件名
    },
    resolve: {
        //自动补全的扩展名
        extensions: ['', '.js', '.vue', '.less', '.css', '.scss'],
        //不自动补全或处理的文件或文件夹
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            //默认路径代理，即import Vue from 'vue',会自动到'/vue/dist/vue.common.js'
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader:'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gig|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {
        //.vue 文件配置loader及工具（autoprefixer)
        loaders : utils.cssLoaders({
            sourceMap: useCssSourceMap
        }),
        postcss :[
            require('autoprefixer')({
                browsers: ['last 10 versions']
            })
        ]
    }
}

