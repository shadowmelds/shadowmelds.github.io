"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var blog_timeline_1 = require("./blog-timeline");
init();
function init() {
    var blog = new blog_timeline_1.BlogTimelineComponent();
    blog.onInit();
}
exports.init = init;
//# sourceMappingURL=blog.js.map