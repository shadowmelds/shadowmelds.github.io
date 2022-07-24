import {Project} from "../../data/project";

export class ProjectTilesComponent {

    projects: Project[];
    projectsTwo: Project[] = [];
    projectsJSON = null;

    onInit(): void {
        const x = window.matchMedia('(min-width: 769px)');
        // window.addEventListener('resize', (event) => this.onResize(event), true);
        this.getProjects(x, "/src/assets/json/projects.json");
    }

    loadProjects(x): void {

        this.projects = [];
        this.projectsTwo = [];

        if (x) {

            for (let i = 0; i　< this.projectsJSON['projects'].length; i++) {
                console.log(this.projectsJSON['projects'][i]);
                if (i % 2 == 0) {
                    this.projects[i / 2] = this.projectsJSON['projects'][i]
                } else {
                    this.projectsTwo[(i - 1) / 2] = this.projectsJSON['projects'][i]
                }
            }
        } else {
            // 单行
            this.projects = this.projectsJSON['projects']
            // 清空第二行
            this.projectsTwo = [];
        }

        let projectNormalElement = document.getElementById('project-link-normal');
        let projectDesktopElement = document.getElementById('project-link-desktop')
        let listNormalParent = document.getElementById('list-normal');
        let listDesktopParent = document.getElementById('list-desktop');
        for (let project of this.projects) {
            let normalElement = projectNormalElement.cloneNode(true) as HTMLAnchorElement;
            normalElement.href = project.url;
            (normalElement.querySelector('.project-icon') as HTMLImageElement).src = this.projectsJSON['baseUrl'] + project.icon;
            (normalElement.querySelector('.text-layout .mat-h2') as HTMLHeadingElement).textContent = project.name;
            (normalElement.querySelector('.text-layout .description') as HTMLParagraphElement).textContent = project.content;

            listNormalParent.appendChild(normalElement);
        }
        for (let project of this.projectsTwo) {
            let desktopElement = projectDesktopElement.cloneNode(true) as HTMLAnchorElement;
            desktopElement.href = project.url;
            (desktopElement.querySelector('.project-icon') as HTMLImageElement).src = this.projectsJSON['baseUrl'] + project.icon;
            (desktopElement.querySelector('.text-layout .mat-h2') as HTMLHeadingElement).textContent = project.name;
            (desktopElement.querySelector('.text-layout .description') as HTMLParagraphElement).textContent = project.content;
            listDesktopParent.appendChild(desktopElement);
        }
        projectNormalElement.remove();
        projectDesktopElement.remove();
    }


    /**
     *
     * @param x ture 单行 false 双行
     * @param url
     */
    getProjects(x, url): void {

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
                    this.projectsJSON = JSON.parse(xmlHttp.responseText)
                    this.loadProjects(x)
                }
            }
        }
    }

    onResize(event): void {
        this.loadProjects(event.target.innerWidth >= 769);
    }
}