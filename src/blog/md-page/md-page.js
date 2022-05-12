"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdPageComponent = void 0;
var markdowns_1 = require("../../data/markdowns");
var jQuery = require("../../assets/js/jquery-3.6.0.min");
var MdPageComponent = /** @class */ (function () {
    function MdPageComponent() {
        this.markdowns = markdowns_1.MARKDOWNS_ALL;
    }
    MdPageComponent.prototype.onInit = function () {
        var url = window.location.hash;
        var id = url.substring(url.lastIndexOf('/') + 1, url.length);
        console.log(id);
        this.getId(id);
        window.addEventListener('hashchange', this.myRender);
    };
    MdPageComponent.prototype.getId = function (id) {
        if (id === '-1') {
            this.initMarkdown('../../assets/markdown/shadowmeld_info.md');
            document.getElementById('tab-about').classList.add('current');
            document.getElementById('tab-blog').classList.remove('current');
        }
        else {
            document.getElementById('tab-about').classList.remove('current');
            document.getElementById('tab-blog').classList.add('current');
            this.initMarkdown(this.markdowns[id].url);
        }
    };
    MdPageComponent.prototype.initMarkdown = function (url) {
        var _this = this;
        var hljs = require('highlight.js');
        var md = require('markdown-it')({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                // 添加这两行才能正确显示 <>
                str = str.replace(/&lt;/g, "<");
                str = str.replace(/&gt;/g, ">");
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                            '</code></pre>';
                        // 得到经过highlight.js之后的html代码
                        // const preCode = hljs.highlight(lang, str, true).value
                        // // 以换行进行分割
                        // const lines = preCode.split(/\n/).slice(0, -1)
                        // // 添加自定义行号
                        // let html = lines.map((item, index) => {
                        //     return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
                        // }).join('')
                        // html = '<ol>' + html + '</ol>'
                        // // 添加代码语言
                        // if (lines.length) {
                        //     html += '<b class="name">' + lang + '</b>'
                        // }
                        // return '<pre class="hljs"><code>' +
                        //     html +
                        //     '</code></pre>'
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
            }
        }).use(require('markdown-it-deflist'));
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            console.log('浏览器不支持');
        }
        if (xmlhttp != null) {
            xmlhttp.open('get', url, true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    var mdContent = xmlhttp.responseText;
                    var result = md.render(mdContent);
                    _this.content = result;
                    document.querySelector('.md-content').insertAdjacentHTML('afterbegin', result);
                    _this.initDir();
                }
            };
        }
    };
    MdPageComponent.prototype.myRender = function () {
        var url = window.location.hash;
        var id = url.substring(url.lastIndexOf('/'), url.length);
        this.getId(id);
    };
    MdPageComponent.prototype.initDir = function () {
        // 加载目录
        var dirCta1 = document.getElementById('dir-cta1').querySelector('ul');
        var dirCta2 = document.getElementById('dir-cta2').querySelector('ul');
        var dirMd1 = document.getElementById('dir-md1');
        var dirMd2 = document.getElementById('dir-md2');
        var mdCta = document.querySelector('.md-content');
        var h1s = mdCta.querySelectorAll("h1, h2, h3, h4, h5");
        var i;
        for (i = 0; i < h1s.length; i++) {
            var heading = h1s[i];
            heading.id = "anchor-".concat(i);
            var li1 = dirMd1.cloneNode(true);
            var li2 = dirMd2.cloneNode(true);
            var a1 = li1.querySelector('a');
            var a2 = li2.querySelector('a');
            a1.textContent = heading.innerText;
            a2.textContent = heading.innerText;
            a1.href = "#anchor-".concat(i);
            a2.href = "#anchor-".concat(i);
            dirCta1.appendChild(li1);
            dirCta2.appendChild(li2);
        }
        dirMd1.remove();
        dirMd2.remove();
        jQuery(document).ready(function ($) {
            $(".scroll").click(function (event) {
                event.preventDefault();
                $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 500);
            });
        });
    };
    return MdPageComponent;
}());
exports.MdPageComponent = MdPageComponent;
init();
function init() {
    var mdPage = new MdPageComponent();
    mdPage.onInit();
}
//# sourceMappingURL=md-page.js.map