// webpack.config.js
var path = require('path');
module.exports = {
    //mode: "development", // 因为在脚本指定了打包模式，所以无需设置
    entry: {
        home: ['./src/app/ui/home/home.js', './src/app/index.js', './src/app/ui/home/skill-bar.js', './src/app/ui/home/skill-button.js', './src/app/ui/home/project-tiles.js'],
        blog: ['./src/app/ui/blog/blog.js'],
        mdpage: ['./src/app/ui/blog/md-page/md-page.js'],
        base: ['./src/app/res/application/base.js', './src/app/res/application/jump-icons.js'],
        photo: ['./src/app/ui/photo/photo.js'],
        theme: ['./src/app/res/application/theme.js'],
        util: ['./src/app/res/application/http-request-util.js']
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js',
    },
}