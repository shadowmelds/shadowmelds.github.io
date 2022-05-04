import {BlogTimelineComponent} from "./blog-timeline";
import * as jQuery from '../assets/js/jquery-3.6.0.min.js';

init();

export function init() {
    let blog = new BlogTimelineComponent()
    blog.onInit()
    jQuery(document).ready(function($) {
        $(".scroll").click(function(event){
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
        });
    });
}
