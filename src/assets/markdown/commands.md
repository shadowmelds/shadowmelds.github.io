# 开发中常用命令

## Android Studio

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">关于 Android Studio : R. jar:进程无法访问该文件，因为它正被另一个进程使用</p>

```
taskkill /im java.exe /f
```

## Git

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Git 设置用户名和邮箱</p>

```
git config --global user.name shadowmelds
git config --global user.email hujincan15369@Gmail.com
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Git 常用命令</p>

```
查看项目状态
git status

添加所有文件的变更
git add .

添加为安全目录
git config --global --add safe.directory 'Path'
```

## NodeJS

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">NodeJS 更改源</p>

```
查看现有源：
npm config get registry
设置淘宝源：
npm install -g mirror-config-china --registry=http://registry.npm.taobao.org
npm install node-sass

如果失败：
首先清除缓存
npm cache clean -f
然后安装
npm i -g mirror-config-china --registry=https://registry.npm.taobao.org -f
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">管理NodeJS版本</p>

```
安装n
npm install -g n

将n升级到最新稳定版
n stable

这两步就搞定了 node 的升级问题。
或者可以这样指定版本升级
n v4.4.7

```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">补充常用 npm 命令</p>

```
npm -v          #显示版本，检查npm 是否正确安装。
 
npm install express   #安装express模块
 
npm install -g express  #全局安装express模块
 
npm list         #列出已安装模块
 
npm show express     #显示模块详情
 
npm update        #升级当前目录下的项目的所有模块
 
npm update express    #升级当前目录下的项目的指定模块
 
npm update -g express  #升级全局安装的express模块
 
npm uninstall express  #删除指定的模块
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">更改 Linux/Mac npm 默认目录解决全局权限错误</p>

```
1. 在命令行的主目录中，为全局安装创建一个目录：
mkdir ~/.npm-global

2.配置 npm 以使用新的目录路径：
npm config set prefix '~/.npm-global'

3. 在您首选的文本编辑器中，打开或创建一个~/.zshrc文件并添加以下行：
export PATH=~/.npm-global/bin:$PATH

4. 在命令行上，更新您的系统变量：
source ~/.zshrc
```