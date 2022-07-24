import {BlogTimelineComponent} from "./blog-timeline";

export class BlogsComponent {

    tags: string[] = [];
    selectedTags: string[] = [];
    markdowns = null;
    blogTimeline = new BlogTimelineComponent();
    json = '';


    onInit(json) {

        this.json = json
        let markdowns = JSON.parse(json);
        this.markdowns = markdowns
        this.tags = markdowns['tags']

        this.blogTimeline.onInit(this.tags)
        this.loadTags();
    }

    loadTags() {

        let originButton = document.getElementById('shadowmeld-tag');
        let parent = document.getElementById('tags-cta');

        for (let index=0; index < this.tags.length; index++) {
            let button = originButton.cloneNode(true) as HTMLButtonElement
            if (button.classList.contains('shadowmeld-tag-ALL')) {
                button.classList.remove('shadowmeld-tag-ALL')
            }
            button.classList.add(`shadowmeld-tag-${index}`);
            let buttonText = (button.querySelector('.button-text') as HTMLSpanElement);
            buttonText.textContent = this.tags[index]
            button.addEventListener('click', () => this.switchSelectState(index));
            parent.appendChild(button);
        }
        originButton.addEventListener('click', () => this.selectedAll());
        this.selectedAll()
        this.update()
    }

    selectedAll() {
        let all = document.querySelector('.shadowmeld-tag-ALL') as HTMLButtonElement
        if (all.classList.contains('unselected')) {
            all.classList.remove('unselected')
            all.classList.add('selected')

            // 主动点击的 selectedAll()
            if (this.selectedTags.length > 0) {
                for (let index=0; index < this.tags.length; index++) {
                    let element = document.querySelector(`.shadowmeld-tag-${index}`) as HTMLButtonElement
                    if (element.classList.contains('selected')) {
                        element.classList.remove('selected')
                        element.classList.add('unselected')
                    }
                }
                this.selectedTags = []
                this.update()
            }
        }
    }

    unselectedAll() {
        let element = document.querySelector('.shadowmeld-tag-ALL') as HTMLButtonElement
        if (element.classList.contains('selected')) {
            element.classList.remove('selected')
            element.classList.add('unselected')
        }
    }

    switchSelectState(id) {
        let element = document.querySelector(`.shadowmeld-tag-${id}`) as HTMLButtonElement
        if (element.classList.contains('selected')) {
            element.classList.remove('selected')
            element.classList.add('unselected')
            this.selectedTags.splice(this.selectedTags.findIndex(item => item === this.tags[id]), 1)
            this.update()

        } else if (element.classList.contains('unselected')) {
            element.classList.remove('unselected')
            element.classList.add('selected')
            this.selectedTags.push(this.tags[id])
            this.update()
        }

        if (this.selectedTags.length > 0) {
            this.unselectedAll()
        } else {
            this.selectedAll()
        }
    }

    update() {
        this.blogTimeline.loadDisplayData(this.json, this.selectedTags)
    }
}

init();

function init() {
    let blogs = new BlogsComponent();

    let xmlHttp: XMLHttpRequest;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        console.log('浏览器不支持');
    }

    if (xmlHttp != null) {
        xmlHttp.open('get',"/src/assets/json/markdowns.json", true)
        // xmlHttp.responseType = 'json';
        xmlHttp.send();
        xmlHttp.onload = () => {
            if (xmlHttp.status === 200 && xmlHttp.responseText != null) {
                blogs.onInit(xmlHttp.responseText);
            }
        }
    }
}
