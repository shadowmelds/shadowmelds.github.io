import {MARKDOWNS_ALL} from "../../data/markdowns";

export class MdPageComponent {

    markdowns = MARKDOWNS_ALL;

    content: string;

    onInit(): void {
        let url = window.location.hash
        let id = url.substring(url.lastIndexOf('/') + 1, url.length)
        console.log(id)
        this.getId(id)
        window.addEventListener('hashchange', this.myRender)
    }

    getId(id: string): void {
        if (id === '-1') {
            this.initMarkdown('../../assets/markdown/shadowmeld_info.md');
        } else {
            this.initMarkdown(this.markdowns[id].url);
        }
    }

    initMarkdown(url): void {
        const hljs = require('highlight.js');
        const md = require('markdown-it')({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                // 添加这两行才能正确显示 <>
                // str = str.replace(/&lt;/g, "<");
                // str = str.replace(/&gt;/g, ">");
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                            '</code></pre>';
                    } catch (__) {}
                }

                return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
            }
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

    myRender(): void {
        let url = window.location.hash
        let id = url.substring(url.lastIndexOf('/'), url.length)
        this.getId(id)
    }
}

init();

function init() {
    let mdPage = new MdPageComponent();
    mdPage.onInit()
}