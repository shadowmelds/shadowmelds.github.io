# 守望先锋英雄模型以及动画导入 Blender

> 2022年5月12日

![预览](/src/assets/markdown/images/20220512234114.jpg)

相关链接：[owdev wiki](https://owdev.wiki/Main_Page)

##### 准备工作：

如有疑问请阅读 [owdev 官方教程](https://owdev.wiki/Tutorial/Extracting_with_DataTool#Software_Needed)

1. 💡 首先建议将当前电脑里安装好的Overwatch目录复制一份到别处、当然直接使用默认安装目录的Overwatch文件也是可以的。默认安装位置为：`C:\Program Files (x86)\Overwatch`，我会将它复制到`D:\OverwatchData\Overwatch` 来进行下一步操作，我们将使用 `DataTool` 提取守望先锋模型数据。每次更新Overwatch都需要`最新版本的DataTool`才能提取，DataTool的开发者可能在最新的守望先锋发布后一周时间左右更新，所以复制一份Overwatch使用就可以免去后续更新DataTool工具了。

2. 获取最新的 [DataTool](https://ci.appveyor.com/project/yretenai/OWLib/build/artifacts) 👈 或者查看 [DataTool Github主页](https://github.com/overtools/OWLib/tree/master)。

3. 将DataTool 解压至 `D:\OverwatchData\toolchain-release` 或者其他任意你喜欢的目录。

4. 如果你查阅过[DataTool Github主页](https://github.com/overtools/OWLib/tree/master)就知道它还需要 [.NET 5.0 Runtime(64-bit) ](https://dotnet.microsoft.com/download/dotnet/5.0/runtime) 👈进入下载后安装。

##### DataTool 常用用法

<br/>
<details>
<summary>👈&nbsp;<b>DataTool 使用方法介绍(展开查看)</b></summary>
<br/>

无论您如何使用 OverTool，它始终遵循相同的写法：

```
datatool "<OW 目录>" mode "<输出目录>" "arguments"
```

一般来说，有两种模式：列表和提取。您可以在模式页面 上查看它们。

1. 清单将显示您可以提取的可用英雄/物品/皮肤（您不需要任何输出目录或参数）。
2. 提取将提取文件，因此如果您要提取特定内容，则需要一个输出文件夹和参数。

请注意，如果目录路径中有空格，则需要在路径周围加上引号。这方面的一个例子是

```
datatool D:\OverwatchData\Overwatch extract-maps "D:\OverwatchData\Datatool output"
```
---

</details>
<br/>

<b>简单的使用</b>

首先用Windows 命令行工具进入DataTool的目录，我这里是`D:\OverwatchData\toolchain-release` 。你可以打开`CMD`或者`Windows Terminal`，运行

```
D:
cd D:\OverwatchData\toolchain-release
```
![进入DataTool目录](/src/assets/markdown/images/20220512205228.png)

1. 首先要做的是使用list-heroes模式列出所有角色及其能力，因为DataTool需要使用与角色/地图列表中出现的名称完全相同的名称。

```
datatool D:\OverwatchData\Overwatch list-heroes
```

你将会在命令行得到以下数据：

![输出内容](/src/assets/markdown/images/20220512212149.png)

2. 你可以将这些输出内容文本复制到你喜欢的编辑器里，方便之后查看导出所选英雄的参数名称。

![暂时保存输出内容](/src/assets/markdown/images/20220512212530.jpg)

3. 要导出英雄数据，需要使用 mode → `extract-unlocks`

    - 所有可导出的类型: skin, icon, spray, victorypose, highlight intro, voiceline。
    - 在`D:\OverwatchData`下新建文件夹`Datatool output`。
    - 导出天使的所有数据包括喷漆、语音、模型..使用：`datatool D:\OverwatchData\Overwatch  extract-unlocks "D:\OverwatchData\Datatool output" 天使`
    - 我们还可以通过使用Skin类型来限制提取哪些皮肤。例如，`"天使|skin=龙族天使"`仅导出 天使的龙族天使 皮肤。
    - 我们可以对图标和icon类型做同样的事情。但是因为我们想要所有的图标，我们将使用*提取所有可用的图标（这适用于所有东西——如果你想提取所有的英雄，地图......）。例子：`datatool D:\OverwatchData\Overwatch extract-unlocks "D:\OverwatchData\Datatool output" "天使|icon=*"`
    - 喷漆的工作原理完全相同，但让我们尝试只提取夏季运动会喷雾剂。`datatool D:\OverwatchData\Overwatch extract-unlocks "D:\OverwatchData\Datatool output" "天使|Spray=(event=summer games)"`

常用的几个命令

```
导出默认皮肤并带骨骼动画：datatool D:\OverwatchData\Overwatch extract-unlocks "D:\OverwatchData\Datatool output" "回声|skin=默认" --extract-refpose

导出所有皮肤并带骨骼动画：datatool D:\OverwatchData\Overwatch extract-unlocks "D:\OverwatchData\Datatool output" "回声|skin=*" --extract-refpose

列出所有地图数据：datatool D:\OverwatchData\Overwatch list-maps

导出地图：datatool D:\OverwatchData\Overwatch extract-maps "D:\OverwatchData\Datatool output" "地图名"
```

所有文件都将转换为最容易进一步使用的格式（Blender）

- 动画：.seanim
- 模型：.owmdl
- 效果：.oweffect
- 实体：.owentity
- 地图：.owmap
- 材料：.owmat
- 喷雾、图标、纹理：.TIF
- 声音文件：.ogg

---

#### 尝试提取龙族天使导入Blender并播放特写动画

###### 使用DataTool 提取龙族天使模型

导出模型以及亮眼表现的特写

```
datatool D:\OverwatchData\Overwatch extract-unlocks "D:\OverwatchData\Datatool output" "天使|skin=龙族天使" --extract-refpose

datatool D:\OverwatchData\Overwatch extract-unlocks "D:\OverwatchData\Datatool output" "天使|HighlightIntro=*"
```

稍等片刻，完成后打开`D:\OverwatchData\Datatool output\Heroes\天使\Skin\周年庆典\Legendary\龙族天使`目录可以看到这样的输出数据 👇

![输出内容](/src/assets/markdown/images/20220512220421.png)

这时候可以关闭我们的命令行窗口了。接下来咱开始使用 Blender导入模型数据。

---

##### 安装Blender及插件

下载安装最新的 [Blender](https://www.blender.org/)

下载以下三个Blender插件放到`D:\OverwatchData\Blender Plugin` 目录下

- [BlenderSourceTools](http://steamreview.org/BlenderSourceTools/) 导入模型插件
- [SEAnim Importer](https://github.com/SE2Dev/io_anim_seanim) 导入骨骼动画插件
- [io_scene_owm](https://github.com/overtools/io_scene_owm) 导入地图模型插件

打开Blender安装插件：打开Blender进入后，点击顶部菜单栏`编辑` 👉 `偏好设置` 新窗口中左侧找到`插件` 👉 在右侧找到`安装...`，选择目录下的一个插件，然后在前面打上勾号✅

![安装并启用插件](/src/assets/markdown/images/20220512221121.jpg)

##### 导入模型

1. 删除默认的Blender 立方体

2. 在Blender顶部菜单选择文件>导入> OWMDL并选择模型文件（通常，人体模型是最大的）来导入您想要使用的OWMDL。这里我会选择`D:\OverwatchData\Datatool output\Heroes\天使\Skin\周年庆典\Legendary\龙族天使\Models\00000000EB3D.00C\下的.owmdl`文件，因为它有2.1MB、可以判断它是天使的模型，Models目录下其他几百KB大小的是武器。

![成功导入模型](/src/assets/markdown/images/20220512224505.jpg)
![成功导入模型](/src/assets/markdown/images/20220512224744.jpg)
![成功导入模型](/src/assets/markdown/images/20220512224801.jpg)

3. 删除现有骨架（到处都是黑条），方法是右键单击它，按DELETE，然后单击鼠标下方出现的删除按钮或按ENTER。

![删除现有骨架](/src/assets/markdown/images/20220512225420.jpg)

4. 如果你想自己绑定骨骼制作自己的动画，现在已经完成了🎇！但如果你只想导入守望先锋特写动画请继续。

##### 将英雄模型动画导入 Blender

5. 为了使事情变得更容易，请通过按A（您可能需要按几次；一旦模型周围出现橙色轮廓，所有内容都会被选中）并按CTRL+J 来连接所有网格。

![合并模型](/src/assets/markdown/images/20220512225648.jpg)

6. 之后，通过转到File > Import > Source Engine (.smd, .vta, .dmx, .qc) 导入相应的 refpose SMD 文件（相同的型号名称/ID），这里我会选择`D:\OverwatchData\Datatool output\Heroes\天使\Skin\周年庆典\Legendary\龙族天使\Models\00000000EB3D.00C\下的.smd`文件。确保左下角的Bone Append Mode设置为Make New Armature而不是默认的Append to Target。然后，您可以导入 refpose，一旦完成，您应该在编辑器中看到模型和骨架（用虚线连接的小球体）。然而，它们目前躺在地上；要使它们直立，请按 再次选择所有内容，然后通过键入A将它们绕 X 轴旋转 90 度R, X, 90, and ENTER。

![导入骨骼](/src/assets/markdown/images/20220512230010.jpg)

![导入骨骼](/src/assets/markdown/images/20220512230057.jpg)

![导入骨骼](/src/assets/markdown/images/20220512230302.jpg)

7. 首先右键单击模型，然后手动选择骨架，然后手动选择模型和骨架。最后选择骨架（周围较浅的橙色轮廓）至关重要。按CTRL+P并单击骨架变形。似乎什么都没有发生是正常的——骨骼目前与模型处于相同的姿势。

![绑定骨骼](/src/assets/markdown/images/20220512230713.jpg)

8. 首先通过右键单击仅选择骨架。然后，转到File > Import > SEAnim (.seanim)，选择您要使用的动画文件 有两个位置可以找到`在天使模型的同级目录下的Animations文件夹下是天使游戏内动作`以及`D:\OverwatchData\Datatool output\Heroes\天使\HighlightIntro\下是亮眼表现的特写动作`，我这里就以`战斗天使`为例，选中`D:\OverwatchData\Datatool output\Heroes\天使\HighlightIntro\守望先锋\Epic\守护天使\Animations\256\000000003728.seanim`，然后按Import SEAnim。这将导入动画，但也会让您进入姿势模式；要退出该模式，请单击视口左下方的Pose Mode框，然后选择Object Mode。

![导入动画](/src/assets/markdown/images/20220512230907.jpg)

![导入动画](/src/assets/markdown/images/20220512233616.jpg)

如果您已正确完成所有操作，您现在应该可以通过按ALT+A或单击时间线下方的“播放”按钮来播放动画。

好耶ヽ(✿ﾟ▽ﾟ)ノ

接下来您可以尝试将武器导入、或者尝试其他的.seanim 动画文件。