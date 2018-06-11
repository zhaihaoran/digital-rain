/**
 *  matrix digital wall
 *
 *  @class Digital
 */
const defaults = {
    ele: "", // dom节点
    hidenRate: 0.025, // 字母消失速度
    letters: "123456789!@#$%^&*~ABCDEFGHIJKLMNOPQRSTUVWXYZ", // 字符集
    fallRate: 65, // 列下降速度
    textDir: "ltr", // 字母方向
    letterSpace: 60, // 列之间的落差范围
    isMustTop: true, // 是否一定要从顶端开始下落，false的话为随机出现
    mode: "window", // window | inherit
    linePercent: 1, // 在哪里截止，默认为最底端
    font_size: 20, // 列宽度 字体宽度
    firstLetterColor: "#FFF", // 首字符颜色，默认为白色
    letterColor: "#6D2", // 字符流的颜色
    background: "#000",
    width: 600, // canvas 宽度
    height: 600 // canvas 高度
}

class Digital {
    /**
     *Creates an instance of Digital.
     * @memberof Digital
     */
    constructor(options) {
        if (!options || typeof options.ele !== "string" || options.ele.length < 1) {
            throw new Error("ele must be a valid string")
        }

        this.options = Object.assign(
            defaults, options || {});

        this.canvas = document.querySelector(this.options.ele);
        // null or HTMLElement
        if (!this.canvas) {
            throw new Error("ele must be a valid DOM node string")
        }

        this.context = this.canvas.getContext("2d");

        this.drops = [];
        this.text = [];
        this._state = true;

        this.init();
    }

    init() {
        // 全局模式
        if (this.options.mode === "window") {
            this.canvas.style.position = "absolute";
            this.canvas.style.width = window.innerWidth + "px";
            this.canvas.style.height = window.innerHeight + "px";

            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerWidth;
        } else {
            this.canvas.height = this.options.height;
            this.canvas.width = this.options.width;
        }
        // 文字方向
        if (this.options.textDir === "rtl") {
            this.context.translate(this.canvas.width, 0);
            this.context.scale(-1, 1);
        }

        this.initDrops(this.canvas.width);
        this.initBackground();

        this.timmer = setInterval(this.draw.bind(this), this.options.fallRate);
    }

    initDrops(width) {
        // 列数
        this._chars = this.options.letters.split('');

        var _columns = Math.ceil(width / this.options.font_size);

        for (let i = 0; i < _columns; i++) {
            this.drops[i] = this.options.isMustTop ? (Math.random() * this.options.letterSpace) - this.options.letterSpace : (Math.random() * this.options.letterSpace);
        }
    }

    initBackground() {
        /* init background */
        this.context.fillStyle = this.options.background;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.drawRawData();

        // 新字母用白色渲染
        const {
            font_size,
            linePercent,
            isMustTop,
            letterSpace,
            firstLetterColor
        } = this.options

        this.context.fillStyle = firstLetterColor;
        for (let i = 0; i < this.drops.length; i++) {
            this.drops[i]++;
            this.text[i] = this._chars[Math.floor(Math.random() * this._chars.length)];
            this.context.fillText(this.text[i], i * font_size, this.drops[i] * font_size);
            // Sending the drop to the top randomly, after it has crossed the screen.
            if (this.drops[i] * font_size > this.canvas.height * linePercent) {
                this.drops[i] = isMustTop ? (Math.random() * letterSpace) - letterSpace : (Math.random() * letterSpace);
            }
        }
    }

    drawRawData() {
        const {
            font_size,
            hidenRate
        } = this.options;

        this.context.font = font_size + "px 'Consolas', 'Lucida Console'";
        this.context.fillStyle = "rgba(0, 0, 0," + hidenRate + ")";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "#6D2";
        for (let i = 0; i < this.drops.length; i++) {
            this.context.fillText(this.text[i] || this._chars[Math.floor(Math.random() * this._chars.length)], i * font_size, this.drops[i] * font_size);
        }
    }

    stop() {
        this._state = false;
        this.initBackground();
        clearInterval(this.timmer);
        this.timmer = null;
        this.drops = [];
        this.text = [];
    }

    start() {
        this._state = true;
        this.init();
    }
}