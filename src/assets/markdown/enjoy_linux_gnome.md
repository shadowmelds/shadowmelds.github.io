# Linux Desktop 享受指南

> 时间：2022年1月30日

### 发行版选择

根据我之前的使用习惯之考虑基于Ubuntu的Linux发行版。有以下几个考虑的Linux 发行版：

- Ubuntu
    - 优点：有简洁安装、驱动基本没问题。默认gnome
- Linux Mint
    - 驱动支持很好，自带软件多，可以gui安装deb。没有自带gnome

经过折腾了半天Ubuntu最后还是选择了Linux Mint，而且恰好发现Linux Mint下载gnome41更好用。

> 更新： 目前更推荐Ubuntu 22.04 自带中文输入法以及Gnome、但网易云音乐客户端暂时无法使用。

![完成](/src/assets/markdown/images/2022-01-30-21-45-04.png "完成效果")

---

## 1. 初始步骤

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">设置 root 密码</p>

```
sudo passwd root
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">更新软件</p>

```
sudo apt-get update
sudo apt-get upgrade
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">安装 screenfetch & 查看系统信息</p>

```
sudo apt install screenfetch -y

screenfetch
```

---

## 2. 代理安装

推荐Clash for Windows Linux版本。

先去官方[Github](https://github.com/Fndroid/clash_for_windows_pkg/releases)地址下载。
解压文件到 /opt/clash 目录下。

创建快捷方式clash.desktop到 /usr/share/applications 下

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

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

第二种方式

[Clash Linux 客户端](https://github.com/Dreamacro/clash/releases) 通常下载clash-linux-amd64.tar.gz

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">在用户目录下创建 clash 文件夹</p>

```
cd && mkdir clash
```

下载适合的 Clash 二进制文件并解压重命名为 clash

在终端 cd 到 Clash 二进制文件所在的目录，执行下载 Clash 配置文件

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
wget -O config.yaml https://stc-anycast.com/link/QQh80WgTTPxfawwu?client=clash&log-level=info
```

执行 ./clash -d . 即可启动 Clash，同时启动 HTTP 代理和 Socks5 代理。

如提示权限不足，请执行 `chmod +x clash`

访问 [Clash Dashboard](http://clash.razord.top) 可以进行切换节点、测延迟等操作。

Host: 127.0.0.1，端口: 9090

---


## 3. 细节体验

#### 解决时间不一致问题

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Windows下用PowerShell执行：</p>

```
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

#### 安装DDC/CI control 控制显示器的屏幕亮度

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
sudo apt install ddccontrol gddccontrol ddccontrol-db i2c-tools
```

#### 文件管理器视频文件预览：

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">1. 安装 ffmpegthumbnailer</p>

```
sudo apt install ffmpegthumbnailer
rm -r ~/.cache/thumbnails
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">2. 重启电脑</p>

```
sudo apt install gstreamer1.0-libav
rm -r ~/.cache/thumbnails/fail
```
这时候应该就成功了。

#### 「如果需要」外部硬盘从只读改为读写，需要重启：

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
sudo mount -o rw,remount /dev/nvme1n1
```

#### 「如果需要」开机自动挂载硬盘：

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">创建rc.local </p>

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

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
chmod +x /etc/init.d/rc.local

sudo gedit /etc/rc.local
lsblk
写入
mount /dev/nvme1n1p2 /media/shadowmeld/disk
```

---

## 4. 视觉提升

#### 「如果需要」安装 GNOME41

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

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

从应用商店安装：gnome-tweak

安装gnome扩展：https://extensions.gnome.org/

安装插件 dash to dock

Bigsur主题 https://github.com/vinceliuice/WhiteSur-gtk-theme
下载解压后运行：

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
./install.sh -i ubuntu
```

美化开机启动项选择：
https://www.gnome-look.org/p/1307852/
下载解压后：

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
sudo ./install.sh
```

推荐McMuse图标解压到 ~/.icons

---

## 5. 软件安装

#### 安装zsh和oh-my-zsh

全局变量：~/.zshrc 、 /etc/profile


#### 安装JDK

https://www.oracle.com/java/technologies/javase-downloads.html

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">下载x64 Compressed Archive .tar.gz</p>

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

#### 安装NodeJS

Node 官网已经把 linux 下载版本更改为已编译好的版本了，我们可以直接下载解压后使用：
解压到 ~/opt 最好不要解压到 /opt 因为不需要它使用su

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
ln -s /home/shadowmeld/opt/node-v16.13.2-linux-x64/bin/npm   /usr/local/bin/ 
ln -s /home/shadowmeld/opt/node-v16.13.2-linux-x64/bin/node   /usr/local/bin/
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">检查</p>

```
npm -v
node -v
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">更改npm 全局模块安装目录</p>

```
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

编辑：~/.profile 或 .zshrc
export PATH=~/.npm-global/bin:$PATH

source ~/.profile
```

#### 安装拼音输入法

使用fcitx：搜狗中文下不支持 / 

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">安装Google输入法</p>

```
sudo apt-get install fcitx-googlepinyin
```

配置language support（语言支持）
选择fcitx，重启。

不过还是推荐安装一下搜狗拼音Linux版，Google pinyin很多常用词汇都没有。

使用ibus，也不错
智能拼音，颜值高。配合插件 ibus font可调整候选词大小简直完美，但是中文词汇和字的排序非常难受。

#### 安装 TIM 微信

1. 安装 Wine 7.0

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

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

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">在 ~/ 下</p>

```
sudo apt install cabextract
sudo apt-get remove winetricks
wget  https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks
chmod +x winetricks
sudo mv -v winetricks /usr/local/bin
```

3. 安装

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

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



####  Wine 微信QQ第二种方式（旧版不稳定）

注意使用这个[deepin-wine](https://github.com/zq1997/deepin-wine)的安装路径在：`/home/shadowmeld/.deepinwine/deepin-wine6-stable/bin`

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">调整微信的dpi</p>

```
env WINEPREFIX=/home/shadowmeld/.deepinwine/Deepin-WeChat ~/.deepinwine/deepin-wine6-stable/bin/wine winecfg
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">调整TIM的dpi</p>

```
env WINEPREFIX=/home/shadowmeld/.deepinwine/Deepin-TIM ~/.deepinwine/deepin-wine6-stable/bin/wine winecfg
```

## 6. 手动安装Nvidia显卡驱动过程

>如果是有图形化的Ubuntu可以直接到设置里驱动管理里面一键安装Nvidia专用驱动，如果没有图形化界面可手动安装Nvidia驱动。

1. 查看是否安装了gcc

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
gcc -v
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">若没有安装，则输入下面的命令，直接把包括gcc在内很多开发工具包一同安装</p>


```
sudo apt-get install build-essential
```

2. 禁用nouveau驱动

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">编辑 /etc/modprobe.d/blacklist-nouveau.conf 文件，添加以下内容</p>

```
blacklist nouveau
blacklist lbm-nouveau
options nouveau modeset=0
alias nouveau off
alias lbm-nouveau off
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">关闭nouveau</p>

```
echo options nouveau modeset=0 | sudo tee -a /etc/modprobe.d/nouveau-kms.conf
```

如果失去图形界面可以使用 Ctrl + F1~F6 进入命令行界面

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">完成后，重新生成内核并重启</p>

```
sudo update-initramfs -u
sudo reboot
```

3. 安装驱动

使用命令`ubuntu-drivers devices`获取可用驱动信息，如果命令不存在自己安装一下。

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
sudo apt-get install -y ubuntu-drivers-common
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">输出为（不同电脑依据配置输出不同，我这里还有报错但是不影响）</p>

```
ERROR:root:could not open aplay -l
Traceback (most recent call last):
  File "/usr/share/ubuntu-drivers-common/detect/sl-modem.py", line 35, in detect
    aplay = subprocess.Popen(
  File "/usr/lib/python3.8/subprocess.py", line 854, in __init__
    self._execute_child(args, executable, preexec_fn, close_fds,
  File "/usr/lib/python3.8/subprocess.py", line 1702, in _execute_child
    raise child_exception_type(errno_num, err_msg, err_filename)
FileNotFoundError: [Errno 2] No such file or directory: 'aplay'
== /sys/devices/pci0000:17/0000:17:00.0/0000:18:00.0 ==
modalias : pci:v000010DEd00002204sv000010DEsd00001454bc03sc00i00
vendor   : NVIDIA Corporation
driver   : nvidia-driver-470 - distro non-free recommended
driver   : nvidia-driver-460 - distro non-free
driver   : nvidia-driver-470-server - distro non-free
driver   : nvidia-driver-495 - distro non-free
driver   : nvidia-driver-460-server - distro non-free
driver   : xserver-xorg-video-nouveau - distro free builtin
```

从上述信息中找到driver，后面找recommend，发现了系统推荐安装的驱动程序nvidia-driver-470。

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">执行命令安装驱动</p>

```
sudo apt install nvidia-driver-470
```

等待安装完成后，执行nvidia-smi可以输出gpu监控界面，则驱动安装成功！从监控信息中我们可以看到cuda版本是11.4，所以下面我们安装cuda toolkit的时候也是安装这个版本的。

4. 「如果需要」安装cuda

在 [https://developer.nvidia.com/cuda-toolkit-archive](https://developer.nvidia.com/cuda-toolkit-archive) 中找到相应的版本。这里我们选用11.4的版本，采用runfile的安装形式。

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">直接输入以下命令</p>

```
wget https://developer.download.nvidia.com/compute/cuda/11.4.0/local_installers/cuda_11.4.0_470.42.01_linux.run
sudo sh cuda_11.4.0_470.42.01_linux.run
```

注意，当提醒你已经安装了driver的时候，直接continue。当选择安装内容的时候，务必把driver前面的x取消掉，因为我们已经安装了驱动！！！
安装完成后重启，输入nvcc -V显示相关信息，则安装成功！

## 7. 其他

Ubuntu 20.04 A start job is running for wait for network to be Configured 解决办法:

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">编辑配置文件</p>

```
vim /etc/systemd/system/network-online.target.wants/systemd-networkd-wait-online.service
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">修改内容</p>

```
[Service]
Type=oneshot
ExecStart=/lib/systemd/systemd-networkd-wait-online
RemainAfterExit=yes
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">下方加入</p>

```
TimeoutStartSec=2sec
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">修改后示例</p>

```
[Service]
Type=oneshot
ExecStart=/lib/systemd/systemd-networkd-wait-online
RemainAfterExit=yes
TimeoutStartSec=2sec
```

#### 切换命令行和图形界面

临时切换成图形界面
Ctrl + F7

临时切换成命令行界面
Ctrl + F1~F6

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">开机默认进入命令行模式</p>

```
sudo systemctl set-default multi-user.target
reboot
```

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">开机默认进入图形界面模式</p>

```
sudo systemctl set-default graphical.target
reboot
```

Now enjoy！😄