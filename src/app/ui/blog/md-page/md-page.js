"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdPageComponent = void 0;
var jQuery = require("../../../res/js/jquery-3.6.0.min");
var MdPageComponent = /** @class */ (function () {
    function MdPageComponent() {
    }
    MdPageComponent.prototype.onInit = function () {
        var url = window.location.hash;
        this.year = url.substring(url.lastIndexOf('#/') + 2, url.lastIndexOf('/'));
        this.id = parseInt(url.substring(url.lastIndexOf('/') + 1, url.length));
        this.loadMarkdowns("/src/assets/json/markdowns.json");
        window.addEventListener('hashchange', this.myRender.bind(this));
    };
    MdPageComponent.prototype.loadMarkdowns = function (url) {
        var _this = this;
        var xmlHttp;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            console.log('浏览器不支持');
        }
        if (xmlHttp != null) {
            xmlHttp.open('get', url, true);
            // xmlHttp.responseType = 'json';
            xmlHttp.send();
            xmlHttp.onload = function () {
                if (xmlHttp.status === 200) {
                    _this.getMarkdownId(xmlHttp.responseText);
                }
            };
        }
    };
    MdPageComponent.prototype.getMarkdownId = function (json) {
        if (json != null) {
            this.markdowns = JSON.parse(json);
        }
        console.log(this.markdowns['markdowns'][this.year]);
        if (this.year === "2021" && this.id === 0) {
            // 需要重置一下⭐⭐⭐⭐
            document.getElementById('tab-about').classList.add('current');
            document.getElementById('tab-blog').classList.remove('current');
            this.initMarkdown('/src/assets/markdown/shadowmeld_info.md');
        }
        else {
            document.getElementById('tab-about').classList.remove('current');
            document.getElementById('tab-blog').classList.add('current');
            this.initMarkdown(this.markdowns['baseUrl'] + this.markdowns['markdowns'][this.year][this.id].url);
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
                    }
                    catch (__) { }
                }
                return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
            }
        }).use(require('markdown-it-deflist'));
        this.addTargetBlank(md);
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
    MdPageComponent.prototype.addTargetBlank = function (md) {
        var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };
        md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            // If you are sure other plugins can't add `target` - drop check below
            var aIndex = tokens[idx].attrIndex('target');
            if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank']); // add new attribute
            }
            else {
                tokens[idx].attrs[aIndex][1] = '_blank'; // replace value of existing attr
            }
            // pass token to default renderer.
            return defaultRender(tokens, idx, options, env, self);
        };
    };
    MdPageComponent.prototype.myRender = function () {
        var url = window.location.hash;
        this.year = url.substring(url.lastIndexOf('#/') + 2, url.lastIndexOf('/'));
        this.id = parseInt(url.substring(url.lastIndexOf('/') + 1, url.length));
        console.log("ID = ".concat(this.id));
        this.getMarkdownId(null);
    };
    MdPageComponent.prototype.initDir = function () {
        // 加载目录
        var dirCta1 = document.getElementById('dir-cta1').querySelector('ul');
        var dirCta2 = document.getElementById('dir-cta2').querySelector('ul');
        var dirMd1 = document.getElementById('dir-md1');
        var dirMd2 = document.getElementById('dir-md2');
        var mdCta = document.querySelector('.md-content');
        var h1s = mdCta.querySelectorAll("h1, h2, h3");
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