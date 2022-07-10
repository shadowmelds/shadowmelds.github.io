import * as jQuery from "../res/js/jquery-3.6.0.min";

export class BlogTimelineComponent {

    timeline!: number;

    reset() {

        let blogCta = document.getElementById('blog-cta');
        blogCta.innerHTML = '';
        
        var e_0 = document.createElement("div");
        e_0.setAttribute("id", "timeline-cta");
        var e_1 = document.createElement("div");
        e_1.setAttribute("class", "timeline-box");
        var e_2 = document.createElement("h4");
        e_2.setAttribute("class", "timeline-h4");
        e_2.appendChild(document.createTextNode("2022"));
        e_1.appendChild(e_2);
        var e_3 = document.createElement("hr");
        e_1.appendChild(e_3);
        e_0.appendChild(e_1);
        var e_4 = document.createElement("div");
        e_4.setAttribute("class", "is-ancestor single-blog-cta");
        e_4.setAttribute("id", "single-blog-cta");
        var e_5 = document.createElement("a");
        e_5.setAttribute("class", "boox blog-link");
        e_5.setAttribute("href", "/blog/md-page/{{md.id}}");
        var e_6 = document.createElement("div");
        e_6.setAttribute("class", "item");
        var e_7 = document.createElement("div");
        e_7.setAttribute("class", "image-layout");
        e_6.appendChild(e_7);
        var e_8 = document.createElement("h3");
        e_8.setAttribute("class", "title is-4 mat-h4");
        e_8.appendChild(document.createTextNode("{{md.title}}"));
        e_6.appendChild(e_8);
        var e_9 = document.createElement("p");
        e_9.setAttribute("class", "date");
        e_9.appendChild(document.createTextNode("{{md.date}}"));
        e_6.appendChild(e_9);
        var e_10 = document.createElement("p");
        e_10.setAttribute("class", "content");
        e_10.appendChild(document.createTextNode("{{md.content}}"));
        e_6.appendChild(e_10);
        e_5.appendChild(e_6);
        e_4.appendChild(e_5);
        e_0.appendChild(e_4);

        blogCta.appendChild(e_0);

        let dirCta1 = (document.getElementById('dir-cta1') as HTMLDivElement).querySelector('ul') as HTMLUListElement
        let dirCta2 = (document.getElementById('dir-cta2') as HTMLDivElement).querySelector('ul') as HTMLUListElement
        dirCta1.innerHTML = '';
        dirCta2.innerHTML = '';

        var d_0 = document.createElement("li");
        d_0.setAttribute("id", "dir-md1");
        var d_1 = document.createElement("a");
        d_1.setAttribute("class", "scroll");
        d_1.setAttribute("href", "#");
        d_1.appendChild(document.createTextNode("Unlimited Tasks"));
        d_0.appendChild(d_1);
        dirCta1.appendChild(d_0);

        var dd_0 = document.createElement("li");
        dd_0.setAttribute("id", "dir-md2");
        var dd_1 = document.createElement("a");
        dd_1.setAttribute("class", "scroll");
        dd_1.setAttribute("href", "#");
        dd_1.appendChild(document.createTextNode("正在加载"));
        dd_0.appendChild(dd_1);
        dirCta2.appendChild(dd_0)
    }

    loadDisplayData(json, selectedTags) {

        let markdown = JSON.parse(json)
        if (selectedTags.length > 0) {

            console.log(selectedTags)
            let displayData = JSON.parse(json);
            for (let year of markdown['years']) {

                for (let md of markdown['markdowns'][year]) {

                    let notHave = true;
                    for (let mdTag of md.tags) {
                        if (selectedTags.indexOf(mdTag) > -1) {
                            // 包含tag
                            console.log("包含tag")
                            notHave = false;
                            break;
                        }
                    }

                    if (notHave) {
                        displayData['markdowns'][year].splice(
                            displayData['markdowns'][year].findIndex(item => item.id === md.id),
                            1
                        )
                    }
                }
            }

            console.log(displayData)
            this.layoutMarkdowns(displayData)

        } else {
            this.layoutMarkdowns(markdown)
        }
    }

    layoutMarkdowns(markdowns) {
        this.reset()

        let blogCta = document.getElementById('blog-cta');
        let timelineCta = document.getElementById('timeline-cta');

        for (let year of markdowns['years'].reverse()) {
            if (markdowns['markdowns'][year].length > 0) {
                let timeline = timelineCta.cloneNode(true) as HTMLDivElement;
                timeline.querySelector('.timeline-h4').textContent = year;

                let singleBlogAnchor = timeline.querySelector('.blog-link')

                for (let md of markdowns['markdowns'][year].reverse()) {

                    let singleBlogCta = timeline.querySelector('#single-blog-cta')
                    let singleBlog = singleBlogAnchor.cloneNode(true) as HTMLAnchorElement
                    singleBlog.href = `md-page/#/${year}/${md.id}`;
                    (singleBlog.querySelector('.image-layout') as HTMLDivElement).style.backgroundImage = `url('${markdowns['baseUrl'] + md.image}')`;
                    (singleBlog.querySelector('.title.mat-h4') as HTMLHeadingElement).textContent = md.title;
                    (singleBlog.querySelector('.image-layout') as HTMLDivElement).id = `md-${year}-${md.id}`;
                    (singleBlog.querySelector('.date') as HTMLParagraphElement).textContent = md.date;
                    (singleBlog.querySelector('.content') as HTMLParagraphElement).textContent = md.content;

                    singleBlogCta.appendChild(singleBlog);
                }
                singleBlogAnchor.remove()
                blogCta.appendChild(timeline);
            }
        }

        timelineCta.remove();

        // 加载目录

        let dirCta1 = (document.getElementById('dir-cta1') as HTMLDivElement).querySelector('ul') as HTMLUListElement
        let dirCta2 = (document.getElementById('dir-cta2') as HTMLDivElement).querySelector('ul') as HTMLUListElement

        let dirMd1 =  document.getElementById('dir-md1') as HTMLLIElement
        let dirMd2 =  document.getElementById('dir-md2') as HTMLLIElement

        for (let year of markdowns['years']) {
            for(var i= 0 ;i<markdowns['markdowns'][year].length;i++){
                let md = markdowns['markdowns'][year][i]
                let li1 = (dirMd1.cloneNode(true) as HTMLLIElement)
                let li2 = (dirMd2.cloneNode(true) as HTMLLIElement)
                let a1 = li1.querySelector('a') as HTMLAnchorElement
                let a2 = li2.querySelector('a') as HTMLAnchorElement
                a1.textContent = md.title
                a2.textContent = md.title
                a1.href = `#md-${year}-${md.id}`
                a2.href = `#md-${year}-${md.id}`
                dirCta1.appendChild(li1)
                dirCta2.appendChild(li2)
            }
        }
        dirMd1.remove()
        dirMd2.remove()

        jQuery(document).ready(function($) {
            $(".scroll").click(function(event){
                event.preventDefault();
                $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
            });
        });
    }
}