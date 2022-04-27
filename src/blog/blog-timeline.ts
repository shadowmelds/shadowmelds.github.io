import {MARKDOWNS_2020, MARKDOWNS_2021, MARKDOWNS_2022} from "../data/markdowns";

export class BlogTimelineComponent {

    markdowns2020 = MARKDOWNS_2020;
    markdowns2021 = MARKDOWNS_2021;
    markdowns2022 = MARKDOWNS_2022;

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
            (singleBlog.querySelector('#image-layout') as HTMLDivElement).style.backgroundImage = `url('${md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
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
            (singleBlog.querySelector('#image-layout') as HTMLDivElement).style.backgroundImage = `url('${md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
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
            (singleBlog.querySelector('#image-layout') as HTMLDivElement).style.backgroundImage = `url('${md.image}')`;
            (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
            (singleBlog.querySelector('.date') as HTMLParagraphElement).textContent = md.date;
            (singleBlog.querySelector('.content') as HTMLParagraphElement).textContent = md.content;

            singleBlogCta.appendChild(singleBlog);
        }
        singleBlogAnchor2022.remove()

        blogCta.appendChild(timeline2022);
        blogCta.appendChild(timeline2021);
        blogCta.appendChild(timeline2020);

        timelineCta.remove();

    }
}