# 💻 提升各操作系统体验的技巧

---

### 提升Windows 10的体验

增加窗口阴影：

- [ShadowFX](https://www.stardock.com/products/shadowfx/)

替换默认字体：

通常可以复制保存的fonts文件夹到C盘根目录，到高级重启命令行里输入以下命令即可替换系统字体

```
>xcopy c:\fonts c:\windows\fonts
>A
>exit
```

---

### 提升Windows 11的体验

替换默认字体：

通常可以复制保存的fonts文件夹到C盘根目录，到高级重启命令行里输入以下命令即可替换系统字体

```
>xcopy c:\fonts c:\windows\fonts
>A
>exit
```

优化任务栏显示方式使工作更加专注

- [RoundTB](https://www.microsoft.com/store/productId/9MTFTXSJ9M7F)
- [SmartTaskBar](https://www.microsoft.com/store/productId/9PJM69MPS6T9)


### Android 安装 Magisk

准备好修补过的 magisk_patched.img 以及原厂 vbmeta.img


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