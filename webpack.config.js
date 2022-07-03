// webpack.config.js
var path = require('path');
module.exports = {
    //mode: "development", // 因为在脚本指定了打包模式，所以无需设置
    entry: {
        home: ['./src/app/home/home.js', './src/app/index.js', './src/app/home/skill-bar.js', './src/app/home/skill-button.js', './src/app/home/project-tiles.js'],
        blog: ['./src/app/blog/blog.js'],
        mdpage: ['./src/app/blog/md-page/md-page.js'],
        base: ['./src/app/global/base.js', './src/app/global/jump-icons.js'],
        photo: ['./src/app/photo/photo.js']
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js',
    },
}