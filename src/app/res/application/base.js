"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    var switchTheme = document.getElementById('switch-theme');
    var html = document.querySelector('HTML');
    switchTheme.addEventListener('click', function () {
        var Mode = document.cookie.split(";")[0].split("=")[1];
        var cookiesExp = new Date(new Date().setMonth(new Date().getMonth() + 1));
        if (Mode == null || Mode == "undefined" || Mode == "") {
            if (html.classList.contains('dark')) {
                document.cookie = "DarkMode=0;path=/;expires=".concat(cookiesExp.toUTCString());
                html.className = 'light';
            }
            else {
                document.cookie = "DarkMode=1;path=/;expires=".concat(cookiesExp.toUTCString());
                html.className = 'dark';
            }
        }
        else if (Mode === '0') {
            document.cookie = "DarkMode=1;path=/;expires=".concat(cookiesExp.toUTCString());
            html.className = 'dark';
        }
        else {
            document.cookie = "DarkMode=0;path=/;expires=".concat(cookiesExp.toUTCString());
            html.className = 'light';
        }
    });
}
//# sourceMappingURL=base.js.map