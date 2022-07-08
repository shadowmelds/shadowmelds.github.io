import {JumpIconsComponent} from "./jump-icons";

init();

function init() {
    let jumpIcons = new JumpIconsComponent();
    jumpIcons.onInit()


    const mobileBtn = document.getElementById('mobile-cta')
    let tabs = document.querySelector('.tabs')
    let nav = document.querySelector('.mobile-menu')

    mobileBtn.addEventListener('click', () => {
        // 添加 class="menu-btn" 到 nav
        if (nav.className.indexOf('menu-btn-exit') > -1) {
            tabs.classList.remove('menu-btn-exit');
            nav.classList.remove('menu-btn-exit');
        } else {
            tabs.classList.add('menu-btn-exit');
            nav.classList.add('menu-btn-exit');
        }
    })


    const switchTheme = document.getElementById('switch-theme');
    const html = document.querySelector('HTML');

    switchTheme.addEventListener('click', () => {

        var Mode = document.cookie.split(";")[0].split("=")[1];
        var cookiesExp = new Date(new Date().setMonth(new Date().getMonth()+1));
        if (Mode == null || Mode == "undefined" || Mode == "") {
            if (html.classList.contains('dark')) {
                document.cookie = `DarkMode=0;path=/;expires=${cookiesExp.toUTCString()}`;
                html.className = 'light'
            } else {
                document.cookie = `DarkMode=1;path=/;expires=${cookiesExp.toUTCString()}`;
                html.className = 'dark'
            }
        } else if (Mode === '0') {
            document.cookie = `DarkMode=1;path=/;expires=${cookiesExp.toUTCString()}`;
            html.className = 'dark'
        } else {
            document.cookie = `DarkMode=0;path=/;expires=${cookiesExp.toUTCString()}`;
            html.className = 'light'
        }
    })
}
export const BASE_ABSOLUTE_URL = ""