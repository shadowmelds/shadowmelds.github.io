"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var blog_timeline_1 = require("./blog-timeline");
var jQuery = require("../res/js/jquery-3.6.0.min.js");
init();
function init() {
    var blog = new blog_timeline_1.BlogTimelineComponent();
    blog.onInit();
    jQuery(document).ready(function ($) {
        $(".scroll").click(function (event) {
            event.preventDefault();
            $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 500);
        });
    });
}
exports.init = init;
//# sourceMappingURL=blog.js.map