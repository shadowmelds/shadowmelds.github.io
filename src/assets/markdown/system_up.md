# 💻 各操作系统个性化体验


### Android 安装 Magisk

准备好修补过的 magisk_patched.img 以及原厂 vbmeta.img


<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
// 重启到 bootloader
adb reboot bootloader

// 禁用 AVB 和 DM Verity
fastboot flash --disable-verity --disable-verification vbmeta vbmeta.img

// 刷写 magisk_patched_boot
fastboot flash boot magisk_patched.img

// 重启设备
fastboot reboot

//完成
```

#### Good Apps

[Lithium: EPUB Reader](https://play.google.com/store/apps/details?id=com.faultexception)

---

### 提升Windows 的体验


<br/>
<details>
<summary>👈&nbsp;「仅限Windows 10」增加窗口阴影：(点击展开)</summary>
<br/>

- [ShadowFX](https://www.stardock.com/products/shadowfx/)

</details>

---

#### 替换默认字体：

通常可以复制自制或者下载到的TTC字体文件到C盘根目录下、新建fonts文件夹内，打开系统设置 → 高级重启 → 命令行里输入以下命令即可替换系统字体

<p class="code_title"><img class="code_title_icon" src="/src/assets/icons/terminal.png">Terminal</p>

```
>xcopy c:\fonts c:\windows\fonts
>A
>exit
```

#### Good Apps

- ePub阅读器：[Starrea ePub Reader](https://www.microsoft.com/store/productId/9NK7HZ90B3S6)

- 图片素材管理：[Eagle](https://cn.eagle.cool/)

---
