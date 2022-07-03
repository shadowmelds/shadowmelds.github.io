import {Social} from "../data/social";

export class JumpIconsComponent {

    onInit(): void {
        this.pathColor();
        this.loadSocials("/src/assets/json/socials.json");
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

    loadSocials(url) {
        let xmlHttp: XMLHttpRequest;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            console.log('浏览器不支持');
        }

        if (xmlHttp != null) {
            xmlHttp.open('get',url, true)
            // xmlHttp.responseType = 'json';
            xmlHttp.send();
            xmlHttp.onload = () => {
                if (xmlHttp.status === 200) {
                    this.socialList(xmlHttp.responseText)
                }
            }
        }
    }
}