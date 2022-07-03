export class BlogTimelineComponent {

    timeline!: number;

    onInit(): void {
        this.loadMarkdowns("/src/assets/json/markdowns.json")
    }

    layoutMarkdowns(json) {

        let markdowns = JSON.parse(json)

        let blogCta = document.getElementById('blog-cta');
        let timelineCta = document.getElementById('timeline-cta');

        let timeline2020 = timelineCta.cloneNode(true) as HTMLDivElement
        let timeline2021 = timelineCta.cloneNode(true) as HTMLDivElement
        let timeline2022 = timelineCta.cloneNode(true) as HTMLDivElement

        timeline2020.querySelector('.timeline-h4').textContent = '2020';
        timeline2021.querySelector('.timeline-h4').textContent = '2021';
        timeline2022.querySelector('.timeline-h4').textContent = '2022';


        let singleBlogAnchor2020 = timeline2020.querySelector('.blog-link')


        for (let md of markdowns['markdowns']['2020'].reverse()) {

            let singleBlogCta = timeline2020.querySelector('#single-blog-cta')
            let singleBlog = singleBlogAnchor2020.cloneNode(true) as HTMLAnchorElement
            singleBlog.href = `md-page/#/2020/${md.id}`;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).style.backgroundImage = `url('${markdowns['baseUrl'] + md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).id = `md-2020-${md.id}`;
            (singleBlog.querySelector('.date') as HTMLParagraphElement).textContent = md.date;
            (singleBlog.querySelector('.content') as HTMLParagraphElement).textContent = md.content;

            singleBlogCta.appendChild(singleBlog);
        }
        singleBlogAnchor2020.remove()

        let singleBlogAnchor2021 = timeline2021.querySelector('.blog-link')
        for (let md of markdowns['markdowns']['2021'].reverse()) {
            let singleBlogCta = timeline2021.querySelector('#single-blog-cta')
            let singleBlog = singleBlogAnchor2021.cloneNode(true) as HTMLAnchorElement
            singleBlog.href = `md-page/#/2021/${md.id}`;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).style.backgroundImage = `url('${markdowns['baseUrl'] + md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).id = `md-2021-${md.id}`;
            (singleBlog.querySelector('.date') as HTMLParagraphElement).textContent = md.date;
            (singleBlog.querySelector('.content') as HTMLParagraphElement).textContent = md.content;

            singleBlogCta.appendChild(singleBlog);
        }
        singleBlogAnchor2021.remove()

        let singleBlogAnchor2022 = timeline2022.querySelector('.blog-link')
        for (let md of markdowns['markdowns']['2022'].reverse()) {
            let singleBlogCta = timeline2022.querySelector('#single-blog-cta')
            let singleBlog = singleBlogAnchor2022.cloneNode(true) as HTMLAnchorElement
            singleBlog.href = `md-page/#/2022/${md.id}`;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).style.backgroundImage = `url('${markdowns['baseUrl'] + md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).id = `md-2022-${md.id}`;
            (singleBlog.querySelector('.date') as HTMLParagraphElement).textContent = md.date;
            (singleBlog.querySelector('.content') as HTMLParagraphElement).textContent = md.content;

            singleBlogCta.appendChild(singleBlog);
        }
        singleBlogAnchor2022.remove()

        blogCta.appendChild(timeline2022);
        blogCta.appendChild(timeline2021);
        blogCta.appendChild(timeline2020);

        timelineCta.remove();

        // 加载目录

        let dirCta1 = (document.getElementById('dir-cta1') as HTMLDivElement).querySelector('ul') as HTMLUListElement
        let dirCta2 = (document.getElementById('dir-cta2') as HTMLDivElement).querySelector('ul') as HTMLUListElement

        let dirMd1 =  document.getElementById('dir-md1') as HTMLLIElement
        let dirMd2 =  document.getElementById('dir-md2') as HTMLLIElement

        for(var i= 0 ;i<markdowns['markdowns']['2022'].length;i++){
            let md = markdowns['markdowns']['2022'][i]
            let li1 = (dirMd1.cloneNode(true) as HTMLLIElement)
            let li2 = (dirMd2.cloneNode(true) as HTMLLIElement)
            let a1 = li1.querySelector('a') as HTMLAnchorElement
            let a2 = li2.querySelector('a') as HTMLAnchorElement
            a1.textContent = md.title
            a2.textContent = md.title
            a1.href = `#md-2022-${md.id}`
            a2.href = `#md-2022-${md.id}`
            dirCta1.appendChild(li1)
            dirCta2.appendChild(li2)
        }

        for(var i= 0 ;i<markdowns['markdowns']['2021'].length;i++){
            let md = markdowns['markdowns']['2021'][i]
            let li1 = (dirMd1.cloneNode(true) as HTMLLIElement)
            let li2 = (dirMd2.cloneNode(true) as HTMLLIElement)
            let a1 = li1.querySelector('a') as HTMLAnchorElement
            let a2 = li2.querySelector('a') as HTMLAnchorElement
            a1.textContent = md.title
            a2.textContent = md.title
            a1.href = `#md-2021-${md.id}`
            a2.href = `#md-2021-${md.id}`
            dirCta1.appendChild(li1)
            dirCta2.appendChild(li2)
        }

        for(var i= 0 ;i<markdowns['markdowns']['2020'].length;i++){
            let md = markdowns['markdowns']['2020'][i]
            let li1 = (dirMd1.cloneNode(true) as HTMLLIElement)
            let li2 = (dirMd2.cloneNode(true) as HTMLLIElement)
            let a1 = li1.querySelector('a') as HTMLAnchorElement
            let a2 = li2.querySelector('a') as HTMLAnchorElement
            a1.textContent = md.title
            a2.textContent = md.title
            a1.href = `#md-2020-${md.id}`
            a2.href = `#md-2020-${md.id}`
            dirCta1.appendChild(li1)
            dirCta2.appendChild(li2)
        }

        dirMd1.remove()
        dirMd2.remove()
    }

    loadMarkdowns(url) {
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
                    this.layoutMarkdowns(xmlHttp.responseText)
                }
            }
        }
    }
}