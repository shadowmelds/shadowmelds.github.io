"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTimelineComponent = void 0;
var jQuery = require("../res/js/jquery-3.6.0.min");
var BlogTimelineComponent = /** @class */ (function () {
    function BlogTimelineComponent() {
    }
    BlogTimelineComponent.prototype.onInit = function () {
        this.loadMarkdowns("/src/assets/json/markdowns.json");
    };
    BlogTimelineComponent.prototype.layoutMarkdowns = function (json) {
        var markdowns = JSON.parse(json);
        var blogCta = document.getElementById('blog-cta');
        var timelineCta = document.getElementById('timeline-cta');
        var timeline2020 = timelineCta.cloneNode(true);
        var timeline2021 = timelineCta.cloneNode(true);
        var timeline2022 = timelineCta.cloneNode(true);
        timeline2020.querySelector('.timeline-h4').textContent = '2020';
        timeline2021.querySelector('.timeline-h4').textContent = '2021';
        timeline2022.querySelector('.timeline-h4').textContent = '2022';
        var singleBlogAnchor2020 = timeline2020.querySelector('.blog-link');
        for (var _i = 0, _a = markdowns['markdowns']['2020'].reverse(); _i < _a.length; _i++) {
            var md = _a[_i];
            var singleBlogCta = timeline2020.querySelector('#single-blog-cta');
            var singleBlog = singleBlogAnchor2020.cloneNode(true);
            singleBlog.href = "md-page/#/2020/".concat(md.id);
            singleBlog.querySelector('.image-layout').style.backgroundImage = "url('".concat(markdowns['baseUrl'] + md.image, "')");
            singleBlog.querySelector('.title.mat-h4').textContent = md.title;
            singleBlog.querySelector('.image-layout').id = "md-2020-".concat(md.id);
            singleBlog.querySelector('.date').textContent = md.date;
            singleBlog.querySelector('.content').textContent = md.content;
            singleBlogCta.appendChild(singleBlog);
        }
        singleBlogAnchor2020.remove();
        var singleBlogAnchor2021 = timeline2021.querySelector('.blog-link');
        for (var _b = 0, _c = markdowns['markdowns']['2021'].reverse(); _b < _c.length; _b++) {
            var md = _c[_b];
            var singleBlogCta = timeline2021.querySelector('#single-blog-cta');
            var singleBlog = singleBlogAnchor2021.cloneNode(true);
            singleBlog.href = "md-page/#/2021/".concat(md.id);
            singleBlog.querySelector('.image-layout').style.backgroundImage = "url('".concat(markdowns['baseUrl'] + md.image, "')");
            singleBlog.querySelector('.title.mat-h4').textContent = md.title;
            singleBlog.querySelector('.image-layout').id = "md-2021-".concat(md.id);
            singleBlog.querySelector('.date').textContent = md.date;
            singleBlog.querySelector('.content').textContent = md.content;
            singleBlogCta.appendChild(singleBlog);
        }
        singleBlogAnchor2021.remove();
        var singleBlogAnchor2022 = timeline2022.querySelector('.blog-link');
        for (var _d = 0, _e = markdowns['markdowns']['2022'].reverse(); _d < _e.length; _d++) {
            var md = _e[_d];
            var singleBlogCta = timeline2022.querySelector('#single-blog-cta');
            var singleBlog = singleBlogAnchor2022.cloneNode(true);
            singleBlog.href = "md-page/#/2022/".concat(md.id);
            singleBlog.querySelector('.image-layout').style.backgroundImage = "url('".concat(markdowns['baseUrl'] + md.image, "')");
            singleBlog.querySelector('.title.mat-h4').textContent = md.title;
            singleBlog.querySelector('.image-layout').id = "md-2022-".concat(md.id);
            singleBlog.querySelector('.date').textContent = md.date;
            singleBlog.querySelector('.content').textContent = md.content;
            singleBlogCta.appendChild(singleBlog);
        }
        singleBlogAnchor2022.remove();
        blogCta.appendChild(timeline2022);
        blogCta.appendChild(timeline2021);
        blogCta.appendChild(timeline2020);
        timelineCta.remove();
        // 加载目录
        var dirCta1 = document.getElementById('dir-cta1').querySelector('ul');
        var dirCta2 = document.getElementById('dir-cta2').querySelector('ul');
        var dirMd1 = document.getElementById('dir-md1');
        var dirMd2 = document.getElementById('dir-md2');
        for (var i = 0; i < markdowns['markdowns']['2022'].length; i++) {
            var md = markdowns['markdowns']['2022'][i];
            var li1 = dirMd1.cloneNode(true);
            var li2 = dirMd2.cloneNode(true);
            var a1 = li1.querySelector('a');
            var a2 = li2.querySelector('a');
            a1.textContent = md.title;
            a2.textContent = md.title;
            a1.href = "#md-2022-".concat(md.id);
            a2.href = "#md-2022-".concat(md.id);
            dirCta1.appendChild(li1);
            dirCta2.appendChild(li2);
        }
        for (var i = 0; i < markdowns['markdowns']['2021'].length; i++) {
            var md = markdowns['markdowns']['2021'][i];
            var li1 = dirMd1.cloneNode(true);
            var li2 = dirMd2.cloneNode(true);
            var a1 = li1.querySelector('a');
            var a2 = li2.querySelector('a');
            a1.textContent = md.title;
            a2.textContent = md.title;
            a1.href = "#md-2021-".concat(md.id);
            a2.href = "#md-2021-".concat(md.id);
            dirCta1.appendChild(li1);
            dirCta2.appendChild(li2);
        }
        for (var i = 0; i < markdowns['markdowns']['2020'].length; i++) {
            var md = markdowns['markdowns']['2020'][i];
            var li1 = dirMd1.cloneNode(true);
            var li2 = dirMd2.cloneNode(true);
            var a1 = li1.querySelector('a');
            var a2 = li2.querySelector('a');
            a1.textContent = md.title;
            a2.textContent = md.title;
            a1.href = "#md-2020-".concat(md.id);
            a2.href = "#md-2020-".concat(md.id);
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
    BlogTimelineComponent.prototype.loadMarkdowns = function (url) {
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
                    _this.layoutMarkdowns(xmlHttp.responseText);
                }
            };
        }
    };
    return BlogTimelineComponent;
}());
exports.BlogTimelineComponent = BlogTimelineComponent;
//# sourceMappingURL=blog-timeline.js.map