"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipSkillButtonComponent = void 0;
var skill_bar_1 = require("./skill-bar");
var ChipSkillButtonComponent = /** @class */ (function () {
    function ChipSkillButtonComponent() {
        this.skillBar = new skill_bar_1.SkillBarComponent();
        this.skills = [];
    }
    ChipSkillButtonComponent.prototype.selectSkill = function (skill) {
        console.log("OnClick");
        this.skillBar.setSkillBar(skill);
    };
    ChipSkillButtonComponent.prototype.onInit = function () {
        this.loadSkills("/src/assets/json/skills.json");
    };
    ChipSkillButtonComponent.prototype.loadSkills = function (url) {
        var _this = this;
        var xmlHttp;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            console.log('浏览器不支持');
        }
        if (xmlHttp != null) {
            xmlHttp.open('get', url, true);
            // xmlHttp.responseType = 'json';
            xmlHttp.send();
            xmlHttp.onload = function () {
                if (xmlHttp.status === 200) {
                    _this.displaySkillButtons(xmlHttp.responseText);
                }
            };
        }
    };
    ChipSkillButtonComponent.prototype.displaySkillButtons = function (json) {
        var _this = this;
        var originButton = document.getElementById('skill');
        var parent = document.getElementById('skills-cta');
        if (json != null) {
            var skills = JSON.parse(json);
            var _loop_1 = function (skill) {
                this_1.skills[skill.id] = {
                    id: skill.id,
                    title: skill.title,
                    icon: skills['baseUrl'] + skill.icon,
                    primary: skill.primary,
                    iconColor: skill.iconColor,
                    rating: skill.rating,
                    titleColor: this_1.styleMethod02(skill.primary)
                };
                var button = originButton.cloneNode(true);
                button.classList.add("skill-".concat(skill.id));
                button.querySelector('.img-icon').src = skills['baseUrl'] + skill.icon;
                var buttonText = button.querySelector('.button-text');
                buttonText.style.color = this_1.skills[skill.id].titleColor;
                buttonText.textContent = skill.title;
                button.addEventListener('click', function () { return _this.selectSkill(_this.skills[skill.id]); });
                parent.appendChild(button);
                this_1.setSkillStyle(skill);
            };
            var this_1 = this;
            for (var _i = 0, _a = skills['skills']; _i < _a.length; _i++) {
                var skill = _a[_i];
                _loop_1(skill);
            }
            originButton.remove();
            this.selectSkill(skills[0]);
        }
    };
    ChipSkillButtonComponent.prototype.setSkillStyle = function (skill) {
        var style = document.createElement('style');
        document.head.appendChild(style);
        var sheet = style.sheet;
        sheet.insertRule(".skills-cta .skill.skill-".concat(skill.id, "{background-color: ").concat(skill.primary, ";}"));
        sheet.insertRule(".skills-cta .skill.skill-".concat(skill.id, "{border-color: ").concat(skill.primary, ";}"));
        sheet.insertRule(".skills-cta .skill.skill-".concat(skill.id, ":focus, .skills-cta .skill.skill-").concat(skill.id, ".is-focused{border-color: ").concat(skill.primary, ";}"));
        sheet.insertRule(".skills-cta .skill.skill-".concat(skill.id, ":focus:not(:active), .skills-cta .skill.skill-").concat(skill.id, ".is-focused:not(:active) {\nbox-shadow: 0 0.5em 1em -0.125em ").concat(this.hexToRGBA('#000000', 0.2), ", 0 0px 0 0.125em ").concat(skill.iconColor, ";}"));
        sheet.insertRule(".skills-cta .skill.skill-".concat(skill.id, ":hover, .skills-cta .skill.skill-").concat(skill.id, ".is-hovered{border-color: ").concat(skill.primary, ";}"));
        sheet.insertRule(".skills-cta .skill.skill-".concat(skill.id, ":active, .skills-cta .skill.skill-").concat(skill.id, ".is-active{border-color: ").concat(skill.primary, ";}"));
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