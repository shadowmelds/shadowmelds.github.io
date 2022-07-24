import {loadJson} from "./http-request-util";
/**
 * 底部导航按钮
 */
export class JumpIconsComponent {

    onInit(): void {
        this.pathColor();
        loadJson("/src/assets/json/socials.json", json => {
            this.socialList(json)
        });
    }

    socialList(json): void {

        let socialLogoElement = document.getElementById('social-logo-layout');
        let parent = document.getElementById('flex-horizontal');

        if (json != null) {
            const socials = JSON.parse(json);
            for (let value of socials['socials']) {
                let socialLogo = socialLogoElement.cloneNode(true) as HTMLDivElement;
                (socialLogo.querySelector('#icon') as HTMLAnchorElement).href = value.url;
                (socialLogo.querySelector('.social-logo') as HTMLImageElement).src = socials['baseUrl'] + value.icon;
                parent.appendChild(socialLogo)
            }
        }
        socialLogoElement.remove()
    }

    async pathColor(): Promise<void> {

        const style = document.createElement('style');
        document.head.appendChild(style);
        const sheet = style.sheet;
        sheet.insertRule('.social-logo:hover path{fill: white;}');
    }
}