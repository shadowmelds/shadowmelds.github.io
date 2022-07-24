"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTimelineComponent = void 0;
var jQuery = require("../../res/js/jquery-3.6.0.min");
var BlogTimelineComponent = /** @class */ (function () {
    function BlogTimelineComponent() {
        this.tagCount = [];
        this.tags = [];
    }
    BlogTimelineComponent.prototype.onInit = function (tags) {
        this.tags = tags;
        this.tagCount = new Array(tags.length);
        console.log(this.tags.length);
        console.log(this.tagCount);
    };
    BlogTimelineComponent.prototype.reset = function () {
        var blogCta = document.getElementById('blog-cta');
        blogCta.innerHTML = '';
        var e_0 = document.createElement("div");
        e_0.setAttribute("id", "timeline-cta");
        var e_1 = document.createElement("div");
        e_1.setAttribute("class", "timeline-box");
        var e_2 = document.createElement("h4");
        e_2.setAttribute("class", "timeline-h4");
        e_2.appendChild(document.createTextNode("2022"));
        e_1.appendChild(e_2);
        var e_3 = document.createElement("hr");
        e_1.appendChild(e_3);
        e_0.appendChild(e_1);
        var e_4 = document.createElement("div");
        e_4.setAttribute("class", "is-ancestor single-blog-cta");
        e_4.setAttribute("id", "single-blog-cta");
        var e_5 = document.createElement("a");
        e_5.setAttribute("class", "boox blog-link");
        e_5.setAttribute("href", "/blog/md-page/{{md.id}}");
        var e_6 = document.createElement("div");
        e_6.setAttribute("class", "item");
        var e_7 = document.createElement("div");
        e_7.setAttribute("class", "image-layout");
        e_6.appendChild(e_7);
        var e_8 = document.createElement("h3");
        e_8.setAttribute("class", "title is-4 mat-h4");
        e_8.appendChild(document.createTextNode("{{md.title}}"));
        e_6.appendChild(e_8);
        var e_9 = document.createElement("p");
        e_9.setAttribute("class", "date");
        e_9.appendChild(document.createTextNode("{{md.date}}"));
        e_6.appendChild(e_9);
        var e_10 = document.createElement("p");
        e_10.setAttribute("class", "content");
        e_10.appendChild(document.createTextNode("{{md.content}}"));
        e_6.appendChild(e_10);
        e_5.appendChild(e_6);
        e_4.appendChild(e_5);
        e_0.appendChild(e_4);
        blogCta.appendChild(e_0);
        var dirCta1 = document.getElementById('dir-cta1').querySelector('ul');
        var dirCta2 = document.getElementById('dir-cta2').querySelector('ul');
        dirCta1.innerHTML = '';
        dirCta2.innerHTML = '';
        var d_0 = document.createElement("li");
        d_0.setAttribute("id", "dir-md1");
        var d_1 = document.createElement("a");
        d_1.setAttribute("class", "scroll");
        d_1.setAttribute("href", "#");
        d_1.appendChild(document.createTextNode("Unlimited Tasks"));
        d_0.appendChild(d_1);
        dirCta1.appendChild(d_0);
        var dd_0 = document.createElement("li");
        dd_0.setAttribute("id", "dir-md2");
        var dd_1 = document.createElement("a");
        dd_1.setAttribute("class", "scroll");
        dd_1.setAttribute("href", "#");
        dd_1.appendChild(document.createTextNode("正在加载"));
        dd_0.appendChild(dd_1);
        dirCta2.appendChild(dd_0);
    };
    BlogTimelineComponent.prototype.loadDisplayData = function (json, selectedTags) {
        var markdown = JSON.parse(json);
        if (selectedTags.length > 0) {
            var displayData = JSON.parse(json);
            for (var _i = 0, _a = markdown['years']; _i < _a.length; _i++) {
                var year = _a[_i];
                var _loop_1 = function (md) {
                    var notHave = true;
                    for (var _d = 0, _e = md.tags; _d < _e.length; _d++) {
                        var mdTag = _e[_d];
                        if (selectedTags.indexOf(mdTag) > -1) {
                            // 包含tag
                            console.log("包含tag");
                            notHave = false;
                            break;
                        }
                    }
                    if (notHave) {
                        displayData['markdowns'][year].splice(displayData['markdowns'][year].findIndex(function (item) { return item.id === md.id; }), 1);
                    }
                };
                for (var _b = 0, _c = markdown['markdowns'][year]; _b < _c.length; _b++) {
                    var md = _c[_b];
                    _loop_1(md);
                }
            }
            this.layoutMarkdowns(displayData, false);
        }
        else {
            // 解析全部
            this.layoutMarkdowns(markdown, true);
        }
    };
    /**
     *
     * @param markdowns
     * @param isAll 加载全部时显示每个Tag的Blog数量
     */
    BlogTimelineComponent.prototype.layoutMarkdowns = function (markdowns, isAll) {
        this.reset();
        var blogCta = document.getElementById('blog-cta');
        var timelineCta = document.getElementById('timeline-cta');
        // 加载全部时显示每个Tag的Blog数量
        if (isAll) {
            this.tagCount.fill(0, 0, this.tags.length);
            var allCount = 0;
            for (var _i = 0, _a = markdowns['years'].reverse(); _i < _a.length; _i++) {
                var year = _a[_i];
                if (markdowns['markdowns'][year].length > 0) {
                    var timeline = timelineCta.cloneNode(true);
                    timeline.querySelector('.timeline-h4').textContent = year;
                    var singleBlogAnchor = timeline.querySelector('.blog-link');
                    for (var _b = 0, _c = markdowns['markdowns'][year].reverse(); _b < _c.length; _b++) {
                        var md = _c[_b];
                        var singleBlogCta = timeline.querySelector('#single-blog-cta');
                        var singleBlog = singleBlogAnchor.cloneNode(true);
                        singleBlog.href = "md-page/#/".concat(year, "/").concat(md.id);
                        singleBlog.querySelector('.image-layout').style.backgroundImage = "url('".concat(markdowns['baseUrl'] + md.image, "')");
                        singleBlog.querySelector('.title.mat-h4').textContent = md.title;
                        singleBlog.querySelector('.image-layout').id = "md-".concat(year, "-").concat(md.id);
                        singleBlog.querySelector('.date').textContent = md.date;
                        singleBlog.querySelector('.content').textContent = md.content;
                        singleBlogCta.appendChild(singleBlog);
                        for (var _d = 0, _e = md.tags; _d < _e.length; _d++) {
                            var mdTag = _e[_d];
                            this.tagCount[this.tags.indexOf(mdTag)] += 1;
                        }
                        allCount += 1;
                    }
                    singleBlogAnchor.remove();
                    blogCta.appendChild(timeline);
                }
            }
            var buttonAll = document.querySelector(".shadowmeld-tag-ALL");
            var buttonTextAll = buttonAll.querySelector('.button-text');
            buttonTextAll.textContent = "\u5168\u90E8 ".concat(allCount);
            for (var index = 0; index < this.tags.length; index++) {
                var button = document.querySelector(".shadowmeld-tag-".concat(index));
                var buttonText = button.querySelector('.button-text');
                buttonText.textContent = "".concat(this.tags[index], " ").concat(this.tagCount[index]);
            }
            console.log("".concat(this.tagCount, " | ").concat(allCount));
        }
        else {
            for (var _f = 0, _g = markdowns['years'].reverse(); _f < _g.length; _f++) {
                var year = _g[_f];
                if (markdowns['markdowns'][year].length > 0) {
                    var timeline = timelineCta.cloneNode(true);
                    timeline.querySelector('.timeline-h4').textContent = year;
                    var singleBlogAnchor = timeline.querySelector('.blog-link');
                    for (var _h = 0, _j = markdowns['markdowns'][year].reverse(); _h < _j.length; _h++) {
                        var md = _j[_h];
                        var singleBlogCta = timeline.querySelector('#single-blog-cta');
                        var singleBlog = singleBlogAnchor.cloneNode(true);
                        singleBlog.href = "md-page/#/".concat(year, "/").concat(md.id);
                        singleBlog.querySelector('.image-layout').style.backgroundImage = "url('".concat(markdowns['baseUrl'] + md.image, "')");
                        singleBlog.querySelector('.title.mat-h4').textContent = md.title;
                        singleBlog.querySelector('.image-layout').id = "md-".concat(year, "-").concat(md.id);
                        singleBlog.querySelector('.date').textContent = md.date;
                        singleBlog.querySelector('.content').textContent = md.content;
                        singleBlogCta.appendChild(singleBlog);
                    }
                    singleBlogAnchor.remove();
                    blogCta.appendChild(timeline);
                }
            }
        }
        timelineCta.remove();
        // 加载目录
        var dirCta1 = document.getElementById('dir-cta1').querySelector('ul');
        var dirCta2 = document.getElementById('dir-cta2').querySelector('ul');
        var dirMd1 = document.getElementById('dir-md1');
        var dirMd2 = document.getElementById('dir-md2');
        for (var _k = 0, _l = markdowns['years']; _k < _l.length; _k++) {
            var year = _l[_k];
            for (var i = 0; i < markdowns['markdowns'][year].length; i++) {
                var md = markdowns['markdowns'][year][i];
                var li1 = dirMd1.cloneNode(true);
                var li2 = dirMd2.cloneNode(true);
                var a1 = li1.querySelector('a');
                var a2 = li2.querySelector('a');
                a1.textContent = md.title;
                a2.textContent = md.title;
                a1.href = "#md-".concat(year, "-").concat(md.id);
                a2.href = "#md-".concat(year, "-").concat(md.id);
                dirCta1.appendChild(li1);
                dirCta2.appendChild(li2);
            }
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
    return BlogTimelineComponent;
}());
exports.BlogTimelineComponent = BlogTimelineComponent;
//# sourceMappingURL=blog-timeline.js.map