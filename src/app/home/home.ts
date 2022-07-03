import {ChipSkillButtonComponent} from "./skill-button";
import {ProjectTilesComponent} from "./project-tiles";

init();

function init() {
    let skillButton = new ChipSkillButtonComponent();
    skillButton.onInit()
    let projectTiles = new ProjectTilesComponent();
    projectTiles.onInit()
}