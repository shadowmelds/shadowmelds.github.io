import {ChipSkillButtonComponent} from "./skill-button";
import {ProjectTilesComponent} from "./project-tiles";
import {JumpIconsComponent} from "./jump-icons";

init();

function init() {
    let skillButton = new ChipSkillButtonComponent();
    skillButton.onInit()
    let projectTiles = new ProjectTilesComponent();
    projectTiles.onInit()
    let jumpIcons = new JumpIconsComponent();
    jumpIcons.onInit()
}