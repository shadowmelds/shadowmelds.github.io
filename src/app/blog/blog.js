"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsComponent = void 0;
var blog_timeline_1 = require("./blog-timeline");
var BlogsComponent = /** @class */ (function () {
    function BlogsComponent() {
        this.tags = [];
        this.selectedTags = [];
        this.markdowns = null;
        this.blogTimeline = new blog_timeline_1.BlogTimelineComponent();
        this.json = '';
    }
    BlogsComponent.prototype.onInit = function (json) {
        this.json = json;
        var markdowns = JSON.parse(json);
        this.markdowns = markdowns;
        this.tags = markdowns['tags'];
        this.loadTags();
    };
    BlogsComponent.prototype.loadTags = function () {
        var _this = this;
        var originButton = document.getElementById('shadowmeld-tag');
        var parent = document.getElementById('tags-cta');
        var _loop_1 = function (index) {
            var button = originButton.cloneNode(true);
            if (button.classList.contains('shadowmeld-tag-ALL')) {
                button.classList.remove('shadowmeld-tag-ALL');
            }
            button.classList.add("shadowmeld-tag-".concat(index));
            var buttonText = button.querySelector('.button-text');
            buttonText.textContent = this_1.tags[index];
            button.addEventListener('click', function () { return _this.switchSelectState(index); });
            parent.appendChild(button);
        };
        var this_1 = this;
        for (var index = 0; index < this.tags.length; index++) {
            _loop_1(index);
        }
        originButton.addEventListener('click', function () { return _this.selectedAll(); });
        this.selectedAll();
        this.update();
    };
    BlogsComponent.prototype.selectedAll = function () {
        var all = document.querySelector('.shadowmeld-tag-ALL');
        if (all.classList.contains('unselected')) {
            all.classList.remove('unselected');
            all.classList.add('selected');
            // 主动点击的 selectedAll()
            if (this.selectedTags.length > 0) {
                for (var index = 0; index < this.tags.length; index++) {
                    var element = document.querySelector(".shadowmeld-tag-".concat(index));
                    if (element.classList.contains('selected')) {
                        element.classList.remove('selected');
                        element.classList.add('unselected');
                    }
                }
                this.selectedTags = [];
                this.update();
            }
        }
    };
    BlogsComponent.prototype.unselectedAll = function () {
        var element = document.querySelector('.shadowmeld-tag-ALL');
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
            element.classList.add('unselected');
        }
    };
    BlogsComponent.prototype.switchSelectState = function (id) {
        var _this = this;
        var element = document.querySelector(".shadowmeld-tag-".concat(id));
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
            element.classList.add('unselected');
            this.selectedTags.splice(this.selectedTags.findIndex(function (item) { return item === _this.tags[id]; }), 1);
            this.update();
        }
        else if (element.classList.contains('unselected')) {
            element.classList.remove('unselected');
            element.classList.add('selected');
            this.selectedTags.push(this.tags[id]);
            this.update();
        }
        if (this.selectedTags.length > 0) {
            this.unselectedAll();
        }
        else {
            this.selectedAll();
        }
    };
    BlogsComponent.prototype.update = function () {
        this.blogTimeline.loadDisplayData(this.json, this.selectedTags);
    };
    return BlogsComponent;
}());
exports.BlogsComponent = BlogsComponent;
init();
function init() {
    var blogs = new BlogsComponent();
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        console.log('浏览器不支持');
    }
    if (xmlHttp != null) {
        xmlHttp.open('get', "/src/assets/json/markdowns.json", true);
        // xmlHttp.responseType = 'json';
        xmlHttp.send();
        xmlHttp.onload = function () {
            if (xmlHttp.status === 200 && xmlHttp.responseText != null) {
                blogs.onInit(xmlHttp.responseText);
            }
        };
    }
}
//# sourceMappingURL=blog.js.map