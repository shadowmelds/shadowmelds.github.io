# 解决 Node-SASS 出现各种报错问题

> 时间：2021年12月30日

今天早上睡不着觉，就把以前用Angular做的一个小网站从Github上Clone下来准备修改修改。打开后首先肯定是要执行一遍`npm install`。可是出现报错了！报错的前几行就是node-sass..

报错了很大一堆红色，我看着npm的`!`就觉得很烦躁😠。为什么，当我辗转覆辙的搜索报错的关键内容`gyp verb Can't find Python`搜索结果里都出现了sass，我回到项目里吧package.json 里的node-sass注释掉，重新运行 npm install，果然不会出现报错了。

当然这不是解决办法，肯定是需要sass的，我尝试了安装不同版本的Python、不同版本的node-sass、不同版本的NodeJS，搜寻一早上的stackoverflow，终于我解决了！


## 解决报错问题

我的项目用的是 node-sass版本是4.14.1

首先去官网查看了一下版本介绍：

![node-sass官网](/src/assets/markdown/images/2021-12-30_082722.png "截图")

我先尝试将版本升为最高的 7.0.1，报错变成Python no can run、以及 需要最新的Visual Studio。我尝试安装了2.7、3.1的 Python 和 Visual Studio，报错依旧不变，依然报错。

所以我开始尝试转向我之前使用的旧版本4.14，在某个版本的Python下，报错由`Python no can run`变成了`python.EXE -c import sys; print "%s.%s.%s" % sys.version_info[:3];`但是只出现了不到3条的链接，然后Google在下方推荐搜索这个`Gyp ERR stack SyntaxError: invalid syntax`。终于我在一条stackflow的回答里有人说可以用Python 3，然后安装Python 2.7 但不必卸载Python 3。

## 最终解决

终于我安装了2两个版本的Python（最新的和2.7版本，然后将两个版本都设置到环境变量上，但是需要2.7的优先级更高），将现有的NodeJS 16降级为NodeJS 14，并且安装的时候勾选了安装必要组件，重新启动 Web Storm，接下来打开项目的时候我再执行`npm install`的时候，奇迹发生了，命令行出现 download github中的 node-sass，由于没有设置代理下载失败了，等它结束后我立刻给NodeJS设置代理，没有报错成功安装了node-sass了！
