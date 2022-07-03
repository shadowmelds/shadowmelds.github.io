import {Skill} from "../data/skill";

export class SkillBarComponent {

    setSkillBar(skill): void {
        this.onInit(skill)
    }

    onInit(skill: Skill): void {
        this.skill = skill
        this.updateHTML()
        this.setupAnimator()
    }

    skill: Skill;

    isAnimateId = -1;
    ratingRecorder = 0;

    updateHTML(): void {
        let skillBar = document.getElementById('skills-bar-cta');
        skillBar.style.backgroundColor = this.skill.primary;
        let skillBarText = skillBar.querySelector('#skills-bar-text') as HTMLSpanElement
        skillBarText.style.color = this.skill.titleColor;
        skillBarText.textContent = this.skill.title;
        (skillBar.querySelector('#skill-logo') as HTMLImageElement).src = this.skill.icon;
    }

    setupAnimator(): void {
        const progressBar = document.querySelector('#in-progress') as HTMLElement;
        progressBar.style.backgroundColor = this.hexToRGBA(this.skill.primary, 0.6);
        if (!(this.isAnimateId === this.skill.id)) {
            this.isAnimateId = this.skill.id;
            const ratingRecorder = this.ratingRecorder;
            this.ratingRecorder = this.skill.rating;
            this.animate({
                timing: (timeFraction) => timeFraction,
                draw: (progress) => {
                    progressBar.style.width = (ratingRecorder + (progress * (this.skill.rating - ratingRecorder))) + '%';
                },
                duration: 300
            });
        }
    }

    animate({timing, draw, duration}): void {

        const start = performance.now();

        requestAnimationFrame(function animate(time): void {
            // timeFraction 从 0 增加到 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) { timeFraction = 1; }

            // 计算当前动画状态
            const progress = timing(timeFraction);

            draw(progress); // 绘制

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
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