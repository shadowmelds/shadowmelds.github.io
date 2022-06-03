import {Social} from "../data/social";

export class JumpIconsComponent {

    social: Social[];

    onInit(): void {
        this.socialList();
        this.pathColor();
        this.updateHTML()
    }

    updateHTML(): void {

        let socialLogoElement = document.getElementById('social-logo-layout');
        let parent = document.getElementById('flex-horizontal');
        for (let value of this.social) {
            let socialLogo = socialLogoElement.cloneNode(true) as HTMLDivElement;
            (socialLogo.querySelector('#icon') as HTMLAnchorElement).href = value.url;
            (socialLogo.querySelector('.social-logo') as HTMLImageElement).src = value.icon;
            parent.appendChild(socialLogo)
        }
        socialLogoElement.remove()
    }

    socialList(): void {
        this.social = [
            {name: 'Twitter', url: 'https://twitter.com/Googleyeahs', icon: '/src/assets/icons/twitter.svg'},
            {name: 'Instagram', url: 'https://www.instagram.com/andrewmartin791/', icon: '/src/assets/icons/instagram.svg'},
            {name: 'Coolapk', url: 'http://www.coolapk.com/u/620606', icon: '/src/assets/icons/coolapk.svg'},
            {name: 'PlayStore', url: 'https://play.google.com/store/apps/dev?id=6609504255163731953', icon: '/src/assets/icons/bxl-play-store.svg'},
            {name: 'QQ', url: 'tencent://Message/?Uin=2530767709&websiteName=q-zone.qq.com&Menu=yes', icon: '/src/assets/icons/qq.svg'},
            {name: 'Github', url: 'https://github.com/hujincan', icon: '/src/assets/icons/github.svg'},
            {name: '网易云音乐', url: 'https://music.163.com/#/user/home?id=280851189', icon: '/src/assets/icons/music163.svg'}
        ];
    }

    async pathColor(): Promise<void> {

        const path = await this.asyncCheck(() => document.querySelector('path'));
        const paths = document.querySelectorAll('path');
        // tslint:disable-next-line:prefer-for-of
        const style = document.createElement('style');
        document.head.appendChild(style);
        const sheet = style.sheet;
        // tslint:disable-next-line:prefer-for-of
        sheet.insertRule('.social-logo:hover path{fill: white;}');
    }

    asyncCheck = async<T> (getter: () => T, checkSize = 100, timeout = 1000) => {
        return new Promise<T>(x => {
            const check = (num = 0) => {
                const target = getter();
                if (target !== undefined && target !== null) {
                    x(target);
                } else if (num > timeout / checkSize) {// 超时
                    x(target);
                } else {
                    setTimeout(() => check(++num), checkSize);
                }
            };
            check();
        });
    }
}