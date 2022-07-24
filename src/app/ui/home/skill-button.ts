import {SkillBarComponent} from "./skill-bar";
import {Skill} from "../../data/skill";

export class ChipSkillButtonComponent {

    skillBar = new SkillBarComponent();
    skills: Skill[] = [];

    selectSkill(skill): void {
        console.log("OnClick");
        this.skillBar.setSkillBar(skill)
    }

    onInit(): void {
        this.loadSkills("/src/assets/json/skills.json");
    }

    loadSkills(url) {
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
                    this.displaySkillButtons(xmlHttp.responseText)
                }
            }
        }
    }
    displaySkillButtons(json): void {
        let originButton = document.getElementById('skill');
        let parent = document.getElementById('skills-cta');

        if (json != null) {
            const skills = JSON.parse(json);
            for (let skill of skills['skills']) {
                this.skills[skill.id] = {
                    id: skill.id,
                    title: skill.title,
                    icon: skills['baseUrl'] + skill.icon,
                    primary: skill.primary,
                    iconColor: skill.iconColor,
                    rating: skill.rating,
                    titleColor: this.styleMethod02(skill.primary)
                }

                let button = originButton.cloneNode(true) as HTMLButtonElement

                button.classList.add(`skill-${skill.id}`);
                (button.querySelector('.img-icon') as HTMLImageElement).src = skills['baseUrl'] + skill.icon;
                let buttonText = (button.querySelector('.button-text') as HTMLSpanElement);
                buttonText.style.color = this.skills[skill.id].titleColor;
                buttonText.textContent = skill.title

                button.addEventListener('click', () => this.selectSkill(this.skills[skill.id]));

                parent.appendChild(button);

                this.setSkillStyle(skill);
            }
            originButton.remove()
            this.selectSkill(this.skills[0])
        }
    }

    setSkillStyle(skill): void {
        const style = document.createElement('style');
        document.head.appendChild(style);
        const sheet = style.sheet;
        sheet.insertRule(`.skills-cta .skill.skill-${skill.id}{background-color: ${skill.primary};}`);
        sheet.insertRule(`.skills-cta .skill.skill-${skill.id}{border-color: ${skill.primary};}`);
        sheet.insertRule(`.skills-cta .skill.skill-${skill.id}:focus, .skills-cta .skill.skill-${skill.id}.is-focused{border-color: ${skill.primary};}`);
        sheet.insertRule(`.skills-cta .skill.skill-${skill.id}:focus:not(:active), .skills-cta .skill.skill-${skill.id}.is-focused:not(:active) {
box-shadow: 0 0.5em 1em -0.125em ${this.hexToRGBA('#000000', 0.2)}, 0 0px 0 0.125em ${skill.iconColor};}`);
        sheet.insertRule(`.skills-cta .skill.skill-${skill.id}:hover, .skills-cta .skill.skill-${skill.id}.is-hovered{border-color: ${skill.primary};}`);
        sheet.insertRule(`.skills-cta .skill.skill-${skill.id}:active, .skills-cta .skill.skill-${skill.id}.is-active{border-color: ${skill.primary};}`);
    }

    toRGB(color: string): string {
        let sColor = color.toLowerCase();

        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#';
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }

            const sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2), 16));
            }
            return 'RGB(' + sColorChange.join(',') + ')';
        }
        return sColor;
    }

    private styleMethod02(color): string {
        let rgb = this.toRGB(color);
        rgb = rgb.replace('RGB(', '');
        rgb = rgb.replace(')', '');
        const arr = rgb.split(',');

        return (parseInt(arr[0], 10) + parseInt(arr[1], 10) + parseInt(arr[2], 10)) / 3 > 128 ? this.hexToRGBA('#000000', 0.8) : this.hexToRGBA('#ffffff', 0.8);
    }

    hexToRGBA(color, opacity): string {
        let sColor = color.toLowerCase();

        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#';
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }

            const sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2), 16));
            }
            return 'rgba(' + sColorChange.join(',') + ',' + opacity + ')';
        }
        return sColor;
    }

}