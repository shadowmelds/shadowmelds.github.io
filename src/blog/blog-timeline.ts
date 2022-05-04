import {MARKDOWNS_2020, MARKDOWNS_2021, MARKDOWNS_2022, MARKDOWNS_ALL} from "../data/markdowns";

export class BlogTimelineComponent {

    markdowns2020 = MARKDOWNS_2020;
    markdowns2021 = MARKDOWNS_2021;
    markdowns2022 = MARKDOWNS_2022;
    markdownAll = MARKDOWNS_ALL;

    timeline!: number;

    onInit(): void {
        this.updateHTML()
    }

    updateHTML() {

        let blogCta = document.getElementById('blog-cta');
        let timelineCta = document.getElementById('timeline-cta');

        let timeline2020 = timelineCta.cloneNode(true) as HTMLDivElement
        let timeline2021 = timelineCta.cloneNode(true) as HTMLDivElement
        let timeline2022 = timelineCta.cloneNode(true) as HTMLDivElement

        timeline2020.querySelector('.timeline-h4').textContent = '2020';
        timeline2021.querySelector('.timeline-h4').textContent = '2021';
        timeline2022.querySelector('.timeline-h4').textContent = '2022';


        let singleBlogAnchor2020 = timeline2020.querySelector('.blog-link')
        for (let md of this.markdowns2020) {

            let singleBlogCta = timeline2020.querySelector('#single-blog-cta')
            let singleBlog = singleBlogAnchor2020.cloneNode(true) as HTMLAnchorElement
            singleBlog.href = `md-page/#/${md.id}`;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).style.backgroundImage = `url('${md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).id = `md-${md.id}`;
            (singleBlog.querySelector('.date') as HTMLParagraphElement).textContent = md.date;
            (singleBlog.querySelector('.content') as HTMLParagraphElement).textContent = md.content;

            singleBlogCta.appendChild(singleBlog);
        }

        singleBlogAnchor2020.remove()

        let singleBlogAnchor2021 = timeline2021.querySelector('.blog-link')
        for (let md of this.markdowns2021) {
            let singleBlogCta = timeline2021.querySelector('#single-blog-cta')
            let singleBlog = singleBlogAnchor2021.cloneNode(true) as HTMLAnchorElement
            singleBlog.href = `md-page/#/${md.id}`;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).style.backgroundImage = `url('${md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).id = `md-${md.id}`;
            (singleBlog.querySelector('.date') as HTMLParagraphElement).textContent = md.date;
            (singleBlog.querySelector('.content') as HTMLParagraphElement).textContent = md.content;

            singleBlogCta.appendChild(singleBlog);
        }
        singleBlogAnchor2021.remove()

        let singleBlogAnchor2022 = timeline2022.querySelector('.blog-link')
        for (let md of this.markdowns2022) {
            let singleBlogCta = timeline2022.querySelector('#single-blog-cta')
            let singleBlog = singleBlogAnchor2022.cloneNode(true) as HTMLAnchorElement
            singleBlog.href = `md-page/#/${md.id}`;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).style.backgroundImage = `url('${md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
            (singleBlog.querySelector('.image-layout') as HTMLDivElement).id = `md-${md.id}`;
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

        for (let md of this.markdownAll) {
            let li1 = (dirMd1.cloneNode(true) as HTMLLIElement)
            let li2 = (dirMd2.cloneNode(true) as HTMLLIElement)
            let a1 = li1.querySelector('a') as HTMLAnchorElement
            let a2 = li2.querySelector('a') as HTMLAnchorElement
            a1.textContent = md.title
            a2.textContent = md.title
            a1.href = `#md-${md.id}`
            a2.href = `#md-${md.id}`
            dirCta1.appendChild(li1)
            dirCta2.appendChild(li2)
        }

        dirMd1.remove()
        dirMd2.remove()
    }
}