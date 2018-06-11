# matrix-digital-rain

digital is a plugin for showing the matrix digital rains

- light : only 100 lines source code and have no dependency
- Plentiful : there are over 15 configuration items for developers to customize situations
- annotation : clear annotation for others to read and revise

# Examples

see the [demo](https://zhaihaoran.github.io/matrix-digital-rain/);

```html
<body>
    <canvas id="canvas"></canvas>
    <script src="digital.js"></script>
    <script>
        new Digital({
            ele: "#canvas"
        });
    </script>
</body>
```

# API

```js
const defaults = {
    ele: "", // dom节点
    hidenRate: 0.025, // 字符消失速度
    letters: "123456789!@#$%^&*~ABCDEFGHIJKLMNOPQRSTUVWXYZ", // 字符集
    fallRate: 65, // 字符掉落速度
    textDir: "ltr", // 字母方向
    letterSpace: 60, // 列之间的落差范围
    isMustTop: true, // 是否从最顶端开始下落，false的话为随机出现
    mode: "window", // window | inherit
    linePercent: 1, // 0~1 在哪里截止，默认为最底端
    font_size: 20, // 列宽度 字体宽度
    firstLetterColor: "#FFF", // 首字符颜色
    letterColor: "#6D2", // 字符流的颜色
    background: "#000",
    width: 600, // canvas 宽度
    height: 600 // canvas 高度
}
```

# Event

```js
document.querySelector('#canvas').addEventListener('click',function(){
    if (digital._state) {
        digital.stop();
    } else {
        digital.start();
    }
})
```