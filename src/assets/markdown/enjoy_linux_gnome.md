# Linux 享受指南

> 时间：2022年1月30日

### 发行版选择

根据我之前的使用习惯之考虑基于Ubuntu的Linux发行版。有以下几个考虑的Linux 发行版：

- Ubuntu
    - 优点：有简洁安装、驱动基本没问题。默认gnome
- Linux Mint
    - 驱动支持很好，自带软件多，可以gui安装deb。没有自带gnome
- CutefishOS
    - 国产、只有BETA版本

经过折腾了半天Ubuntu最后还是选择了Linux Mint，而且恰好发现Linux Mint下载gnome41更好用。

![完成](/src/assets/markdown/images/2022-01-30-21-45-04.png "完成效果")

### 输入法安装

##### 安装Google拼音输入法

使用fcitx：搜狗中文下不支持 / 

```
sudo apt-get install fcitx-googlepinyin
```

配置language support（语言支持）

选择fcitx，重启。

不过还是推荐安装一下搜狗拼音Linux版，Google pinyin很多常用词汇都没有。

使用ibus，也不错
智能拼音，颜值高。配合插件 ibus font可调整候选词大小简直完美，但是中文词汇和字的排序非常难受。

### 翻墙软件安装

推荐Clash for Windows Linux版本。

先去官方[Github](https://github.com/Fndroid/clash_for_windows_pkg/releases)地址下载。
解压文件到 /opt/clash 目录下。

创建快捷方式clash.desktop到 /usr/share/applications 下

```
#!/usr/bin/env xdg-open
[Desktop Entry]
Name=clash
Exec=/opt/clash/cfw
Terminal=false
Type=Application
Icon=/opt/clash/clash.png
StartupWMClass=Clash for Windows
Comment=clash
Categories=Application;

```

### 视觉提升

##### 安装DDC/CI control 控制显示器的屏幕亮度

```
sudo apt install ddccontrol gddccontrol ddccontrol-db i2c-tools
```

##### 安装gnome41

```
sudo apt update && sudo apt upgrade -y
sudo add-apt-repository ppa:devacom/x11 -y
sudo add-apt-repository ppa:devacom/gnome-40 -y
sudo add-apt-repository ppa:devacom/gnome-41 -y
sudo apt-get update
sudo apt install ubuntu-desktop gnome-shell gnome-control-center

选择 gdm3

sudo apt update && sudo apt upgrade
sudo reboot

登录时选择gnome
```

安装 screenfetch 查看系统信息

```
sudo apt install screenfetch -y

screenfetch
```

从应用商店安装：gnome-tweak

安装gnome扩展：https://extensions.gnome.org/

安装插件 dash to dock

Bigsur主题 https://github.com/vinceliuice/WhiteSur-gtk-theme
下载解压后运行：

```
./install.sh -i ubuntu
```

美化开机启动项选择：
https://www.gnome-look.org/p/1307852/
下载解压后：

```
sudo ./install.sh
```

##### 解决时间不一致问题

Windows下用PowerShell执行：

```
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

##### 图标解压到 ~/.icons
推荐McMuse

### 细节体验

##### 外部硬盘从只读改为读写，需要重启：

```
sudo mount -o rw,remount /dev/nvme1n1
```

##### 开机自动挂载硬盘：

创建rc.local 

```
sudo gedit /etc/systemd/system/rc-local.service

写入
[Unit]
 Description=/etc/rc.local Compatibility
 ConditionPathExists=/etc/rc.local
 
[Service]
 Type=forking
 ExecStart=/etc/rc.local start
 TimeoutSec=0
 StandardOutput=tty
 RemainAfterExit=yes
 SysVStartPriority=99
#sysVstart这行可以删掉，我看启动日志中貌似报忽略这个了。。
 
[Install]
 WantedBy=multi-user.target

执行
sudo systemctl enable rc-local.service
```

```
chmod +x /etc/init.d/rc.local

sudo gedit /etc/rc.local
lsblk
写入
mount /dev/nvme1n1p2 /media/shadowmeld/disk
```

##### 文件管理器视频文件预览：

1.

```
sudo apt install ffmpegthumbnailer
rm -r ~/.cache/thumbnails
```

重启电脑

2.

```
sudo apt install gstreamer1.0-libav
rm -r ~/.cache/thumbnails/fail
```
这时候应该就成功了。

##### 安装 TIM 微信

1. 安装 Wine 7.0

```
// 安装Official Wine仓库
wget -qO - https://dl.winehq.org/wine-builds/winehq.key | sudo apt-key add -

// 安装存储库
sudo add-apt-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ focal main'

// 更新程序包缓存
sudo apt update

// 安装Wine 6
sudo apt install --install-recommends winehq-stable

// 验证Wine安装
wine --version

// 最后重启系统
```

2. 安装最新的 winetricks

在 ~/ 下
```
sudo apt install cabextract
sudo apt-get remove winetricks
wget  https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks
chmod +x winetricks
sudo mv -v winetricks /usr/local/bin
```

3. 安装

```
wine WechatSetup.exe

wine TIM.exe

tim 可能没有快捷方式：
创建TIM.desktop:
#!/usr/bin/env xdg-open
[Desktop Entry]
Name=TIM
Exec=wine "/home/shadowmeld/.wine/drive_c/Program Files (x86)/Tencent/TIM/bin/tim.exe"
Icon=/home/shadowmeld/.wine/drive_c/Program Files (x86)/Tencent/TIM/TIMUninst.ico
Type=Application
Categories=Wine;
StartupWMClass=tim.exe
```

直接winecfg调整缩放。4k推荐140



#####  Wine 微信QQ第二种方式（旧版不稳定）

注意使用这个[deepin-wine](https://github.com/zq1997/deepin-wine)的安装路径在：`/home/shadowmeld/.deepinwine/deepin-wine6-stable/bin`

调整微信的dpi

```
env WINEPREFIX=/home/shadowmeld/.deepinwine/Deepin-WeChat ~/.deepinwine/deepin-wine6-stable/bin/wine winecfg
```

调整TIM的dpi

```
env WINEPREFIX=/home/shadowmeld/.deepinwine/Deepin-TIM ~/.deepinwine/deepin-wine6-stable/bin/wine winecfg
```

##### 安装zsh和oh-my-zsh

全局变量：~/.zshrc 、 /etc/profile


##### 安装JDK

https://www.oracle.com/java/technologies/javase-downloads.html

下载x64 Compressed Archive .tar.gz

```
mkdir /opt/java

tar -zxvf jdk-17_linux-x64_bin.tar.gz -C /opt/java

修改/etc/profile，在末尾添加：
export JAVA_HOME=/opt/java/jdk-17.0.2
export CLASSPATH=.:${JAVA_HOME}/lib
export PATH=.:${JAVA_HOME}/bin:$PATH

source /etc/profile
java -version

```

##### 安装NodeJS
Node 官网已经把 linux 下载版本更改为已编译好的版本了，我们可以直接下载解压后使用：
解压到 ~/opt 最好不要解压到 /opt 因为不需要它使用su

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：

```
ln -s /home/shadowmeld/opt/node-v16.13.2-linux-x64/bin/npm   /usr/local/bin/ 
ln -s /home/shadowmeld/opt/node-v16.13.2-linux-x64/bin/node   /usr/local/bin/
```

检查

```
npm -v
node -v
```
更改npm 全局模块安装目录

```
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

编辑：~/.profile 或 .zshrc
export PATH=~/.npm-global/bin:$PATH

source ~/.profile
```


Now enjoy！😄