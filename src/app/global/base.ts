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
}
export const BASE_ABSOLUTE_URL = ""