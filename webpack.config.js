// webpack.config.js
var path = require('path');
module.exports = {
    //mode: "development", // 因为在脚本指定了打包模式，所以无需设置
    entry: {
        home: ['./src/home/home.js', './src/index.js', './src/home/skill-bar.js', './src/home/skill-button.js', './src/home/project-tiles.js', './src/home/test.js', './src/home/test2.js'],
        blog: ['./src/blog/blog.js'],
        mdpage: ['./src/blog/md-page/md-page.js'],
        base: ['./src/global/base.js', './src/global/jump-icons.js']
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js',
    },
}