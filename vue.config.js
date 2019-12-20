// 引入插件
//const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    devServer: {
      proxy: 'http://127.0.0.1/jinqi_api/public/index.php/api/'
    },

    // 链式配置
    chainWebpack:config=>{

      //发布模式
      config.when(process.env.NODE_ENV === 'production',config=>{

        config.entry('app').clear().add('./src/main-prod.js');
          
        //排除打包项
        config.set('externals',{
          vue:'Vue',
          'element-ui':'ELEMENT'
        })

        // 设置参数变量值
        config.plugin('html').tap(args=>{
            //添加参数isProd
            args[0].isProd = true
            return args
        })
        
      })

      //开发模式
      config.when(process.env.NODE_ENV === 'development',config=>{
        
        config.entry('app').clear().add('./src/main-dev.js');
        
        // 设置参数变量值
        config.plugin('html').tap(args=>{
          //添加参数isProd
          args[0].isProd = false
          return args
        })

      })

    }

  
  }

