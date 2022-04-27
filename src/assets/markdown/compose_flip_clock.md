# Android Compose 翻页时钟实现

> 时间：2022年1月9日

我最近换掉了我的Pixel 3XL，原因是它不能解锁内存太小而且电源键坏了😠，当然是换不起Pixel 6 Pro，所以闲鱼淘了个Pixel 5 原谅绿。所以我想着要不把Pixel 3XL做成桌面时钟吧。

Google 其实很早就发布了 Compose 测试版，不过去年也终于上了正式版，并且支持了Material You🤩！

我这个时钟项目目前还是完成了翻页时钟的组件，有了这个组件做翻页时钟就只是App逻辑需要实现了，因为我还在学习Angular，而且需要更多时间去做前，还不知道能不能坚持完成这个项目。所以先在这里写一写如何做这样一个简单的Demo。

![演示Gif](/src/assets/markdown/images/flip_clock_demo.gif "Gif")

### 实现思路

首先我先去Google了一下翻页时钟的动画，看看翻页时钟究竟是如何做`翻页`这个动作的。就是大概上图那样的演示效果图，我的空间思维不怎么好，所以通过绘画辅助来看看翻页究竟是怎样的一个过程：

![简易原理图](/src/assets/markdown/images/20220109225129.png "简易原理图")

分析：最简单的单个翻页组件需要四个单独的绘制，在上图左侧标出了四个序号代表四个单独的绘制部分，因为数字在变化的过程中四个块显示的数字是不一样的。原理图右侧是动画时四个块应该何时显示A，何时显示B有一个清晰的描述：

动画开始

1. 块1和块2 都应该显示`A`，同时块3、块4不显示或者显示`A`。
2. 块2 变成显示`B`的下半部分，块3虽然开始动画但还是显示`A`的下半部分。
3. 块1保持显示`A`上半部分,块2和块3都显示新的部分，块4显示`B`的上半部分。
4. 块1和块2 都应该显示`B`，同时块3、块4不显示或者显示`B`。

动画结束

### 基本绘制

所以有了上面这个简易的原理图后，撸代码实现就很清晰了，首先当然是绘制出四个不同的块的初始的样子，首先新建一个FlipClockComponent.kt用来负责显示这样一个简单的翻页小组件。

**FlipClockComponent.kt**

```kotlin
@Composable
fun FlipClockComponent(
    modifier: Modifier = Modifier,
    viewModel: ClockModel = androidx.lifecycle.viewmodel.compose.viewModel() // ViewModel用于之后控制动画
) {
    
    // 块的颜色，这里我直接用的Material You的API
    val primaryContainer = MaterialTheme.colorScheme.secondaryContainer
    // 文字的颜色，同样也是用的Material You的API
    val textColor = MaterialTheme.colorScheme.secondary

    // 获得一个 Camera 实例
    val camera by lazy {
        val camera1 = Camera()
        //将摄像头拉远，翻页效果更加明显
        camera1.setLocation(0f, 0f, -20f)
        camera1
    }

    // 简单的用Box包裹一下
    Box(modifier = modifier) {
        // 在这个画布内绘制
        Canvas(modifier = Modifier.fillMaxSize()) {

            // 块的高度，由于只是演示，没有做具体的适配屏幕
            val cardHeight = size.height - 400f
            
            // 文字画笔
            val paint = Paint().asFrameworkPaint()
            paint.textAlign = android.graphics.Paint.Align.CENTER
            paint.textSize = cardHeight * 0.85f
            paint.color = textColor.toArgb()

            // 文字的区域，用于居中文字
            val textBoundRect = Rect()

            // 根据单个数字所需的宽获取块所需的宽度
            val textBounds = Rect()
            paint.getTextBounds("0", 0, 1, textBounds)
            val cardWidth = textBounds.width().toFloat() * 1.5f

            // 剪裁区域以及块的画笔
            val cutPaint = Paint().asFrameworkPaint()
            cutPaint.color = primaryContainer.toArgb()

            // 中间那条缝隙的高度参考
            val cutHeight = 8f

            // 画块1（动画结束新值/动画开始立刻新值）
            drawIntoCanvas {

                // 给一个新图层，防止使用剪裁时出现全黑效果
                it.nativeCanvas.saveLayerAlpha(size.toRect().toAndroidRectF(), 255)
                it.nativeCanvas.getClipBounds(textBoundRect)
                val cWidth = textBoundRect.width()
                val cHeight = textBoundRect.height()

                // 画块背景
                cutPaint.xfermode = null
                it.nativeCanvas.drawRoundRect(
                    center.x - (cardWidth / 2f),
                    center.y - (cardHeight / 2f),
                    center.x + (cardWidth / 2f),
                    center.y + (cardHeight / 2f),
                    26f,
                    26f,
                    cutPaint
                )

                // 画文字
                val text = viewModel.onDefaultUp.toString() // 从ViewModel中取
                paint.getTextBounds(text, 0, text.length, textBoundRect)
                val x = cWidth / 2f
                val y = cHeight / 2f + textBoundRect.height() / 2f - textBoundRect.bottom
                it.nativeCanvas.drawText(text, x, y, paint)

                // 剪裁（因为从中心绘制块，所以需要减裁掉缝隙高度）
                cutPaint.xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_OUT)
                it.nativeCanvas.drawRect(
                    center.x - (cardWidth / 2f) - 4f,
                    center.y - cutHeight,
                    center.x + (cardWidth / 2f) + 4f,
                    center.y + (cardHeight / 2f) + 4f,
                    cutPaint
                )
            }

            // 画块2（动画开始立刻新值/动画结束新值）
            drawIntoCanvas {

                // 给一个新图层，防止使用剪裁时出现全黑效果
                it.nativeCanvas.saveLayerAlpha(size.toRect().toAndroidRectF(), 255)
                it.nativeCanvas.getClipBounds(textBoundRect)
                val cWidth = textBoundRect.width()
                val cHeight = textBoundRect.height()

                // 画块背景
                cutPaint.xfermode = null
                it.nativeCanvas.drawRoundRect(
                    center.x - (cardWidth / 2f),
                    center.y - (cardHeight / 2f),
                    center.x + (cardWidth / 2f),
                    center.y + (cardHeight / 2f),
                    26f,
                    26f,
                    cutPaint
                )

                // 画文字
                val text = viewModel.onDefaultDown.toString() // 从ViewModel中取
                paint.getTextBounds(text, 0, text.length, textBoundRect)
                val x = cWidth / 2f
                val y = cHeight / 2f + textBoundRect.height() / 2f - textBoundRect.bottom
                it.nativeCanvas.drawText(text, x, y, paint)

                // 剪裁（因为从中心绘制块，所以需要减裁掉缝隙高度）
                cutPaint.xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_OUT)
                it.nativeCanvas.drawRect(
                    center.x - (cardWidth / 2f) - 4f,
                    center.y - (cardHeight / 2f) - cutHeight,
                    center.x + (cardWidth / 2f) + 4f,
                    center.y + cutHeight - 4f,
                    cutPaint
                )
            }

            // 画块3（动画结束新值/动画进行一半新值）
            drawIntoCanvas {

                // 给一个新图层，防止使用剪裁时出现全黑效果
                it.nativeCanvas.saveLayerAlpha(size.toRect().toAndroidRectF(), 255)
                it.nativeCanvas.getClipBounds(textBoundRect)
                val cWidth = textBoundRect.width()
                val cHeight = textBoundRect.height()

                // 翻转块3的角度
                it.nativeCanvas.save()
                it.nativeCanvas.translate(center.x, center.y)
                camera.save()
                camera.rotateX(if (viewModel.downRotate >= 90f) 90f else viewModel.downRotate)
                camera.applyToCanvas(it.nativeCanvas)
                camera.restore()
                it.nativeCanvas.translate(-center.x, -center.y)

                // 画块背景
                cutPaint.xfermode = null
                it.nativeCanvas.drawRoundRect(
                    center.x - (cardWidth / 2f),
                    center.y - (cardHeight / 2f),
                    center.x + (cardWidth / 2f),
                    center.y + (cardHeight / 2f),
                    26f,
                    26f,
                    cutPaint
                )

                // 画文字
                val text = viewModel.onAnimDown.toString()
                paint.getTextBounds(text, 0, text.length, textBoundRect)
                val x = cWidth / 2f
                val y = cHeight / 2f + textBoundRect.height() / 2f - textBoundRect.bottom
                it.nativeCanvas.drawText(text, x, y, paint)

                // 剪裁（因为从中心绘制块，所以需要减裁掉缝隙高度）
                cutPaint.xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_OUT)
                it.nativeCanvas.drawRect(
                    center.x - (cardWidth / 2f) - 4f,
                    center.y - (cardHeight / 2f) - cutHeight,
                    center.x + (cardWidth / 2f) + 4f,
                    center.y + cutHeight - 4f,
                    cutPaint
                )

                // 恢复画布
                it.nativeCanvas.restore()
            }

            // 画块4（动画进行一半新值/动画结束新值）
            drawIntoCanvas {

                // 给一个新图层，防止使用剪裁时出现全黑效果
                it.nativeCanvas.saveLayerAlpha(size.toRect().toAndroidRectF(), 255)
                it.nativeCanvas.getClipBounds(textBoundRect)
                val cWidth = textBoundRect.width()
                val cHeight = textBoundRect.height()

                // 翻转块4的角度
                it.nativeCanvas.save()
                it.nativeCanvas.translate(center.x, center.y)
                camera.save()
                camera.rotateX(if (viewModel.upRotate <= -90f) -90f else viewModel.upRotate)
                camera.applyToCanvas(it.nativeCanvas)
                camera.restore()
                it.nativeCanvas.translate(-center.x, -center.y)

                // 画块背景
                cutPaint.xfermode = null
                it.nativeCanvas.drawRoundRect(
                    center.x - (cardWidth / 2f),
                    center.y - (cardHeight / 2f),
                    center.x + (cardWidth / 2f),
                    center.y + (cardHeight / 2f),
                    26f,
                    26f,
                    cutPaint
                )

                // 画文字
                val text = viewModel.onAnimUp.toString()
                paint.getTextBounds(text, 0, text.length, textBoundRect)
                val x = cWidth / 2f
                val y = cHeight / 2f + textBoundRect.height() / 2f - textBoundRect.bottom
                it.nativeCanvas.drawText(text, x, y, paint)

                // 剪裁（因为从中心绘制块，所以需要减裁掉缝隙高度）
                cutPaint.xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_OUT)
                it.nativeCanvas.drawRect(
                    center.x - (cardWidth / 2f) - 4f,
                    center.y - cutHeight,
                    center.x + (cardWidth / 2f) + 4f,
                    center.y + (cardHeight / 2f) + 4f,
                    cutPaint
                )

                // 恢复画布
                it.nativeCanvas.restore()
            }
        }
    }
}

```

哈哈哈，是不是吓傻了😂“什么？代码这么多？” 其实代码并不复杂，仔细看其实有3/4的代码都是差不多一样的，因为四个块的绘制其实是大同小异的，四个 drawIntoCanvas {} 绘制了不同的四个块，而块1和块2基本一样，块3、块4只是多了翻转角度的代码，了解一些`Camera`类的使用相信你会觉得这并不是很复杂。这样看是不是简单了很多？

你如果复制粘贴到项目中会发现有些viewModel的数据是没有的，原因是这些我们还没有开始写ViewModel部分，以上只是绘制了默认状态。而ViewModel会也会给这些使用者默认数据，如果将以上有viewModel数据的代码改成 String 改成 `“0”`、`"A"`，Int部分改成 `90`、`-90`、`0` 它们将不会报错，并呈现出默认状态，自己试试吧。

好了，当然如果我们想真正的控制这个FlipClockComponent 像最上面那张Gif展示的样子，我们还需要写一些两个简单的按钮来实现控制。所以先不管ViewModel了，先把控制按钮和这个Component展示出来吧：

![效果图](/src/assets/markdown/images/Screenshot_20220110-20442.png "简易原理图")

新建**ClockScreen.kt**

```kotlin
@Composable
fun ClockScreen(
    viewModel: ClockModel = androidx.lifecycle.viewmodel.compose.viewModel()
) {

    Box {

        Row {
            Button(onClick = {
                viewModel.onNext((0..9).random())
            }) {
                Text("下一页")
            }
            Button(onClick = {
                viewModel.onPrevious((0..9).random())
            }) {
                Text("上一页")
            }
        }

        FlipClockComponent()
    }
}
```

实际上就是简单添加两个按钮，然后把刚才写好的`FlipClockComponent`显示出来，然后在Activity里显示这个ClockScreen：

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
        YourAppTheme {
            Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                ClockScreen()
            }
        }
    }
}
```

### 动画实现

现在可以来看看ViewModel部分了，因为两个按钮的点击事件里分辨调用了ViewModel里的`onNext()` 以及 `onPrevious()`方法：

新建**ClockViewModel.kt**

```kotlin
/**
 * ClockViewModel
 */
class ClockModel : ViewModel() {

    // 块3 的ValueAnimator
    private val downAnimator = ValueAnimator().apply {
        interpolator = LinearInterpolator()
        duration = 250
        addUpdateListener {
            downRotate = it.animatedValue as Float
        }
    }

    // 块4 的ValueAnimator
    private val upAnimator = ValueAnimator().apply {
        interpolator = LinearInterpolator()
        duration = 250
        addUpdateListener {
            upRotate = it.animatedValue as Float
        }
    }


    /**
     * 更新向上的角度
     */
    var downRotate by mutableStateOf(0f)
        private set

    /**
     * 更新向下的角度
     */
    var upRotate by mutableStateOf(0f)
        private set

    /**
     * 默认上部分更新数字(块1)
     */
    var onDefaultUp by mutableStateOf(0)
        private set

    /**
     * 默认下部分更新数字(块2)
     */
    var onDefaultDown by mutableStateOf(0)
        private set

    /**
     * 上部分更新数字(块4)
     */
    var onAnimUp by mutableStateOf(0)
        private set

    /**
     * 下部分更新数字(块3)
     */
    var onAnimDown by mutableStateOf(0)
        private set


    /**
     * 下一页
     */
    fun onNext(newNumber: Int) {
        onTurnPageAnimation(true, newNumber)
    }

    /**
     * 上一页
     */
    fun onPrevious(newNumber: Int) {
        onTurnPageAnimation(false, newNumber)
    }


    /**
     * 开始翻页动画
     * rotateUp: 翻页方向
     * newNumber: 翻页后显示新的数字
     */
    private fun onTurnPageAnimation(
        rotateUp: Boolean,
        newNumber: Int
    ) {

        downAnimator.cancel()
        upAnimator.cancel()
        downAnimator.removeAllListeners()
        upAnimator.removeAllListeners()

        if (rotateUp) {
            downAnimator.setFloatValues(0f, 90f)
            downAnimator.addListener(object : AnimatorListenerAdapter() {
                override fun onAnimationEnd(animation: Animator?) {
                    super.onAnimationEnd(animation)
                    // 上半部分动画
                    upAnimator.setFloatValues(-90f, 0f)
                    upAnimator.addListener(object : AnimatorListenerAdapter() {
                        override fun onAnimationEnd(animation: Animator?) {
                            super.onAnimationEnd(animation)
                            onDefaultUp = newNumber
                            Log.d("TestUpdate", "onEndAnimation.invoke()")
                        }
                    })
                    upAnimator.start()
                    onAnimDown = newNumber
                    onAnimUp = newNumber
                }
            })
            downAnimator.start()
            onDefaultDown = newNumber

        } else {
            upAnimator.setFloatValues(0f, -90f)
            upAnimator.addListener(object : AnimatorListenerAdapter() {
                override fun onAnimationEnd(animation: Animator?) {
                    super.onAnimationEnd(animation)
                    // 下半部分动画
                    downAnimator.setFloatValues(90f, 0f)
                    downAnimator.addListener(object : AnimatorListenerAdapter() {
                        override fun onAnimationEnd(animation: Animator?) {
                            super.onAnimationEnd(animation)
                            onDefaultDown = newNumber
                        }
                    })
                    downAnimator.start()
                    onAnimDown = newNumber
                    onAnimUp = newNumber

                }
            })
            upAnimator.start()
            onDefaultUp = newNumber
        }
    }

}
```

有了ViewModel后，就可以控制和实现动画效果了。ViewModel做的工作主要是用Compose提供`mutableStateOf`实现可变数据（mutableData）。因为在`FlipClockComponent`多处引用了ViewModel的角度和数字的mutableData，所以mutableData 更新时会通知`FlipClockComponent` 更新自身绘制。

ViewModel提供还给外界两个方法`onNext()`和`onPrevious()` 它们内部就是调用了Animation更新mutableData。

### 总结

🥳🥳以上就是实现翻页动画效果的完整代码，其实总共就是三个步骤：

1. 绘制一个翻页简图，看看翻页的过程，以便了解如何绘制。
2. 绘制出不会动的基本的翻页时钟
3. 添加动画和控制

技术点：

- `Camera` 做翻转。
- `ValueAnimator` 和 mutableData 做出正确方向的控制。

本篇已经实现了所有必须的代码，自己一定要试试哦🌟！
