"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipSkillButtonComponent = void 0;
var skill_bar_1 = require("./skill-bar");
var ChipSkillButtonComponent = /** @class */ (function () {
    function ChipSkillButtonComponent() {
        this.skillBar = new skill_bar_1.SkillBarComponent();
    }
    ChipSkillButtonComponent.prototype.selectSkill = function (skill) {
        this.selectedSkill = skill;
        console.log("OnClick");
        this.skillBar.setSkillBar(skill);
    };
    ChipSkillButtonComponent.prototype.onInit = function () {
        this.getSkills();
        this.displaySkillButtons();
        this.setSkillStyle();
        this.selectSkill(this.skills[0]);
    };
    ChipSkillButtonComponent.prototype.displaySkillButtons = function () {
        var _this = this;
        var originButton = document.getElementById('skill');
        var parent = document.getElementById('skills-cta');
        var _loop_1 = function (skill) {
            var button = originButton.cloneNode(true);
            button.classList.add("skill-".concat(skill.id));
            console.log(skill.id);
            console.log(skill.icon);
            button.querySelector('.img-icon').src = skill.icon;
            var buttonText = button.querySelector('.button-text');
            buttonText.style.color = skill.titleColor;
            buttonText.textContent = skill.title;
            button.addEventListener('click', function () { return _this.selectSkill(skill); });
            parent.appendChild(button);
        };
        for (var _i = 0, _a = this.skills; _i < _a.length; _i++) {
            var skill = _a[_i];
            _loop_1(skill);
        }
        originButton.remove();
    };
    ChipSkillButtonComponent.prototype.getSkills = function () {
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
    };
    ChipSkillButtonComponent.prototype.setSkillStyle = function () {
        for (var _i = 0, _a = this.skills; _i < _a.length; _i++) {
            var value = _a[_i];
            var style = document.createElement('style');
            document.head.appendChild(style);
            var sheet = style.sheet;
            sheet.insertRule(".skills-cta .skill.skill-".concat(value.id, "{background-color: ").concat(this.skills[value.id].primary, ";}"));
            sheet.insertRule(".skills-cta .skill.skill-".concat(value.id, "{border-color: ").concat(this.skills[value.id].primary, ";}"));
            sheet.insertRule(".skills-cta .skill.skill-".concat(value.id, ":focus, .skills-cta .skill.skill-").concat(value.id, ".is-focused{border-color: ").concat(this.skills[value.id].primary, ";}"));
            sheet.insertRule(".skills-cta .skill.skill-".concat(value.id, ":focus:not(:active), .skills-cta .skill.skill-").concat(value.id, ".is-focused:not(:active) {\n    box-shadow: 0 0.5em 1em -0.125em ").concat(this.hexToRGBA('#000000', 0.2), ", 0 0px 0 0.125em ").concat(this.skills[value.id].primaryDark, ";}"));
            sheet.insertRule(".skills-cta .skill.skill-".concat(value.id, ":hover, .skills-cta .skill.skill-").concat(value.id, ".is-hovered{border-color: ").concat(this.skills[value.id].primary, ";}"));
            sheet.insertRule(".skills-cta .skill.skill-".concat(value.id, ":active, .skills-cta .skill.skill-").concat(value.id, ".is-active{border-color: ").concat(this.skills[value.id].primary, ";}"));
        }
    };
    ChipSkillButtonComponent.prototype.toRGB = function (color) {
        var sColor = color.toLowerCase();
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = '#';
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2), 16));
            }
            return 'RGB(' + sColorChange.join(',') + ')';
        }
        return sColor;
    };
    ChipSkillButtonComponent.prototype.styleMethod02 = function (color) {
        var rgb = this.toRGB(color);
        rgb = rgb.replace('RGB(', '');
        rgb = rgb.replace(')', '');
        var arr = rgb.split(',');
        return (parseInt(arr[0], 10) + parseInt(arr[1], 10) + parseInt(arr[2], 10)) / 3 > 128 ? this.hexToRGBA('#000000', 0.8) : this.hexToRGBA('#ffffff', 0.8);
    };
    ChipSkillButtonComponent.prototype.hexToRGBA = function (color, opacity) {
        var sColor = color.toLowerCase();
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = '#';
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2), 16));
            }
            return 'rgba(' + sColorChange.join(',') + ',' + opacity + ')';
        }
        return sColor;
    };
    return ChipSkillButtonComponent;
}());
exports.ChipSkillButtonComponent = ChipSkillButtonComponent;
//# sourceMappingURL=skill-button.js.map