import {MARKDOWNS_ALL} from "../../data/markdowns";
import * as jQuery from "../../assets/js/jquery-3.6.0.min";

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
            document.getElementById('tab-about').classList.add('current');
            document.getElementById('tab-blog').classList.remove('current');
        } else {
            document.getElementById('tab-about').classList.remove('current');
            document.getElementById('tab-blog').classList.add('current');
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
                str = str.replace(/&lt;/g, "<");
                str = str.replace(/&gt;/g, ">");
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                            '</code></pre>';
                        // 得到经过highlight.js之后的html代码
                        // const preCode = hljs.highlight(lang, str, true).value
                        // // 以换行进行分割
                        // const lines = preCode.split(/\n/).slice(0, -1)
                        // // 添加自定义行号
                        // let html = lines.map((item, index) => {
                        //     return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
                        // }).join('')
                        // html = '<ol>' + html + '</ol>'
                        // // 添加代码语言
                        // if (lines.length) {
                        //     html += '<b class="name">' + lang + '</b>'
                        // }
                        // return '<pre class="hljs"><code>' +
                        //     html +
                        //     '</code></pre>'
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

                    this.initDir()
                }
            };
        }
    }

    myRender(): void {
        let url = window.location.hash
        let id = url.substring(url.lastIndexOf('/'), url.length)
        this.getId(id)
    }

    initDir(): void {

        // 加载目录

        let dirCta1 = (document.getElementById('dir-cta1') as HTMLDivElement).querySelector('ul') as HTMLUListElement;
        let dirCta2 = (document.getElementById('dir-cta2') as HTMLDivElement).querySelector('ul') as HTMLUListElement;

        let dirMd1 =  document.getElementById('dir-md1') as HTMLLIElement;
        let dirMd2 =  document.getElementById('dir-md2') as HTMLLIElement;


        let mdCta = document.querySelector('.md-content') as HTMLDivElement;
        let h1s = mdCta.querySelectorAll("h1, h2, h3, h4, h5");
        var i;
        for (i = 0; i < h1s.length; i++) {
            let heading = h1s[i] as HTMLHeadingElement;
            heading.id = `anchor-${i}`;

            let li1 = (dirMd1.cloneNode(true) as HTMLLIElement);
            let li2 = (dirMd2.cloneNode(true) as HTMLLIElement);
            let a1 = li1.querySelector('a') as HTMLAnchorElement;
            let a2 = li2.querySelector('a') as HTMLAnchorElement;
            a1.textContent = heading.innerText;
            a2.textContent = heading.innerText;
            a1.href = `#anchor-${i}`;
            a2.href = `#anchor-${i}`;
            dirCta1.appendChild(li1);
            dirCta2.appendChild(li2);
        }

        dirMd1.remove()
        dirMd2.remove()
    }
}

init();

function init() {
    let mdPage = new MdPageComponent();
    mdPage.onInit()

    jQuery(document).ready(function($) {
        $(".scroll").click(function(event){
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
        });
    });
}