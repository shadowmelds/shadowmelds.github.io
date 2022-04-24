import {MARKDOWNS_ALL} from "../../data/markdowns";

export class MdPageComponent {

    markdowns = MARKDOWNS_ALL;

    content: string;

    onInit(): void {
        this.getId();
    }

    getId(): void {
        const id = -1; // 获取地址栏的id
        if (id === -1) {
            this.initMarkdown('../../assets/markdown/shadowmeld_info.md');
        } else {
            this.initMarkdown(this.markdowns[id].url);
        }
    }

    initMarkdown(url): void {
        const md = require('markdown-it')({
            html: true,
            linkify: true,
            typographer: true
        }).use(require('markdown-it-deflist'));

        let xmlhttp: XMLHttpRequest;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            console.log('浏览器不支持');
        }
        if (xmlhttp != null) {
            xmlhttp.open('get', url, true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    const mdContent = xmlhttp.responseText;
                    const result = md.render(mdContent);
                    this.content = result;
                    document.querySelector('.md-content').insertAdjacentHTML('afterbegin', result);
                }
            };
        }
    }
}

init();

function init() {
    let mdPage = new MdPageComponent();
    mdPage.onInit()
}