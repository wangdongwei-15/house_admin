
//项目发布阶段需要用到的babel插件
const productPlugins = []

// 环境变量
if(process.env.NODE_ENV === 'production'){
  //发布阶段
  // productPlugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[...productPlugins]
}

