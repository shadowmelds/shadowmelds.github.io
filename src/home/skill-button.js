"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipSkillButtonComponent = void 0;
const skill_bar_1 = require("./skill-bar");
class ChipSkillButtonComponent {
    constructor() {
        this.skillBar = new skill_bar_1.SkillBarComponent();
    }
    selectSkill(skill) {
        this.selectedSkill = skill;
        console.log("OnClick");
        this.skillBar.setSkillBar(skill);
    }
    onInit() {
        this.getSkills();
        this.displaySkillButtons();
        this.setSkillStyle();
        this.selectSkill(this.skills[0]);
    }
    displaySkillButtons() {
        let originButton = document.getElementById('skill');
        let parent = document.getElementById('skills-cta');
        for (let skill of this.skills) {
            let button = originButton.cloneNode(true);
            button.classList.add(`skill-${skill.id}`);
            console.log(skill.id);
            console.log(skill.icon);
            button.querySelector('.img-icon').src = skill.icon;
            let buttonText = button.querySelector('.button-text');
            buttonText.style.color = skill.titleColor;
            buttonText.textContent = skill.title;
            button.addEventListener('click', () => this.selectSkill(skill));
            parent.appendChild(button);
        }
        originButton.remove();
    }
    getSkills() {
        this.skills = [
            { id: 0, title: 'Android', icon: '../assets/icons/android.svg', primary: '#3DDC84', primaryDark: '#23A65D',
                titleColor: this.styleMethod02('#3DDC84'), rating: 70 },
            { id: 1, title: 'Material Design', icon: '../assets/icons/material-design.svg', primary: '#6717F6', primaryDark: '#3f1dcb',
                titleColor: this.styleMethod02('#6717F6'), rating: 30 },
            { id: 2, title: 'Kotlin', icon: '../assets/icons/language-kotlin.svg', primary: '#6779F6', primaryDark: '#26418f',
                titleColor: this.styleMethod02('#26418f'), rating: 63 },
            { id: 3, title: 'Java', icon: '../assets/icons/java.svg', primary: '#ED8B17', primaryDark: '#c77800',
                titleColor: this.styleMethod02('#c77800'), rating: 60 },
            { id: 4, title: 'Angular', icon: '../assets/icons/angular.svg', primary: '#DD0031', primaryDark: '#ab000d',
                titleColor: this.styleMethod02('#DD0031'), rating: 18 },
            { id: 5, title: 'TypeScript', icon: '../assets/icons/typescript.svg', primary: '#007ACC', primaryDark: '#004ba0',
                titleColor: this.styleMethod02('#007ACC'), rating: 19 },
            { id: 6, title: 'CSS3', icon: '../assets/icons/css-3-logo.svg', primary: '#1B84C2', primaryDark: '#004ba0',
                titleColor: this.styleMethod02('#1B84C2'), rating: 26 },
            { id: 7, title: 'HTML5', icon: '../assets/icons/html5.svg', primary: '#EA6228', primaryDark: '#c43e00',
                titleColor: this.styleMethod02('#EA6228'), rating: 24 },
            { id: 8, title: 'Overwatch', icon: '../assets/icons/overwatch.svg', primary: '#FA9C1E', primaryDark: '#c67c17',
                titleColor: this.styleMethod02('#FA9C1E'), rating: 48 },
            { id: 9, title: 'Blender', icon: '../assets/icons/blender.svg', primary: '#E87C0D', primaryDark: '#b4600a',
                titleColor: this.styleMethod02('#E87C0D'), rating: 12 },
        ];
    }
    setSkillStyle() {
        for (const value of this.skills) {
            const style = document.createElement('style');
            document.head.appendChild(style);
            const sheet = style.sheet;
            sheet.insertRule(`.skills-cta .skill.skill-${value.id}{background-color: ${this.skills[value.id].primary};}`);
            sheet.insertRule(`.skills-cta .skill.skill-${value.id}{border-color: ${this.skills[value.id].primary};}`);
            sheet.insertRule(`.skills-cta .skill.skill-${value.id}:focus, .skills-cta .skill.skill-${value.id}.is-focused{border-color: ${this.skills[value.id].primary};}`);
            sheet.insertRule(`.skills-cta .skill.skill-${value.id}:focus:not(:active), .skills-cta .skill.skill-${value.id}.is-focused:not(:active) {
    box-shadow: 0 0.5em 1em -0.125em ${this.hexToRGBA('#000000', 0.2)}, 0 0px 0 0.125em ${this.skills[value.id].primaryDark};}`);
            sheet.insertRule(`.skills-cta .skill.skill-${value.id}:hover, .skills-cta .skill.skill-${value.id}.is-hovered{border-color: ${this.skills[value.id].primary};}`);
            sheet.insertRule(`.skills-cta .skill.skill-${value.id}:active, .skills-cta .skill.skill-${value.id}.is-active{border-color: ${this.skills[value.id].primary};}`);
        }
    }
    toRGB(color) {
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
    styleMethod02(color) {
        let rgb = this.toRGB(color);
        rgb = rgb.replace('RGB(', '');
        rgb = rgb.replace(')', '');
        const arr = rgb.split(',');
        return (parseInt(arr[0], 10) + parseInt(arr[1], 10) + parseInt(arr[2], 10)) / 3 > 128 ? this.hexToRGBA('#000000', 0.8) : this.hexToRGBA('#ffffff', 0.8);
    }
    hexToRGBA(color, opacity) {
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
exports.ChipSkillButtonComponent = ChipSkillButtonComponent;
//# sourceMappingURL=skill-button.js.map