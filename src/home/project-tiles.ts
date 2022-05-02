import {Project} from "../data/project";

export class ProjectTilesComponent {

    projects: Project[];
    projectsTwo: Project[];

    onInit(): void {
        const x = window.matchMedia('(min-width: 769px)');
        // window.addEventListener('resize', (event) => this.onResize(event), true);
        this.getProjects(x);
        this.updateHTML();

    }

    updateHTML(): void {

        let projectNormalElement = document.getElementById('project-link-normal');
        let projectDesktopElement = document.getElementById('project-link-desktop')
        let listNormalParent = document.getElementById('list-normal');
        let listDesktopParent = document.getElementById('list-desktop');
        for (let project of this.projects) {
            let normalElement = projectNormalElement.cloneNode(true) as HTMLAnchorElement;
            normalElement.href = project.url;
            (normalElement.querySelector('.project-icon') as HTMLImageElement).src = project.icon;
            (normalElement.querySelector('.text-layout .mat-h2') as HTMLHeadingElement).textContent = project.name;
            (normalElement.querySelector('.text-layout .description') as HTMLParagraphElement).textContent = project.content;

            listNormalParent.appendChild(normalElement);
        }
        for (let project of this.projectsTwo) {
            let desktopElement = projectDesktopElement.cloneNode(true) as HTMLAnchorElement;
            desktopElement.href = project.url;
            (desktopElement.querySelector('.project-icon') as HTMLImageElement).src = project.icon;
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
     */
    getProjects(x): void {

        if (x) {
            // 双行
            this.projects = [
                {icon: '../assets/img/project_shadowmeld_site.png', name: 'ShadowmeldHome', content: '本网站的开源地址',
                    url: 'https://github.com/shadowmelds/shadowmelds.github.io'}
            ];
            this.projectsTwo = [
                {icon: '../assets/img/project_shadowmeld_site.png', name: 'ShadowmeldWebsite', content: '本网站的旧版本开源地址',
                    url: 'https://github.com/shadowmelds/AndrewHomeSite'}
            ];
        } else {
            // 单行
            this.projects = [
                {icon: '../assets/img/project_shadowmeld_site.png', name: 'ShadowmeldHome', content: '本网站的开源地址',
                    url: 'https://github.com/shadowmelds/shadowmelds.github.io'},
                {icon: '../assets/img/project_shadowmeld_site.png', name: 'ShadowmeldWebsite', content: '本网站的旧版本开源地址',
                    url: 'https://github.com/shadowmelds/AndrewHomeSite'}
            ];
            // 清空第二行
            this.projectsTwo = [];
        }
    }

    onResize(event): void {
        this.getProjects(event.target.innerWidth >= 769);
        this.updateHTML();
    }
}