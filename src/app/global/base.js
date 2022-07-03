"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_ABSOLUTE_URL = void 0;
var jump_icons_1 = require("./jump-icons");
init();
function init() {
    var jumpIcons = new jump_icons_1.JumpIconsComponent();
    jumpIcons.onInit();
    var mobileBtn = document.getElementById('mobile-cta');
    var tabs = document.querySelector('.tabs');
    var nav = document.querySelector('.mobile-menu');
    mobileBtn.addEventListener('click', function () {
        // 添加 class="menu-btn" 到 nav
        if (nav.className.indexOf('menu-btn-exit') > -1) {
            tabs.classList.remove('menu-btn-exit');
            nav.classList.remove('menu-btn-exit');
        }
        else {
            tabs.classList.add('menu-btn-exit');
            nav.classList.add('menu-btn-exit');
        }
    });
}
exports.BASE_ABSOLUTE_URL = "";
//# sourceMappingURL=base.js.map