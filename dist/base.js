(()=>{"use strict";var t={7735:(t,e,n)=>{var o=n(1186);!function(){(new o.JumpIconsComponent).onInit();var t=document.getElementById("mobile-cta"),e=document.querySelector(".tabs"),n=document.querySelector(".mobile-menu");t.addEventListener("click",(function(){n.className.indexOf("menu-btn-exit")>-1?(e.classList.remove("menu-btn-exit"),n.classList.remove("menu-btn-exit")):(e.classList.add("menu-btn-exit"),n.classList.add("menu-btn-exit"))}))}()},1186:function(t,e){var n=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function s(t){try{a(o.next(t))}catch(t){i(t)}}function c(t){try{a(o.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,c)}a((o=o.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var n,o,r,i,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,o=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((r=(r=s.trys).length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){s.label=i[1];break}if(6===i[0]&&s.label<r[1]){s.label=r[1],r=i;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(i);break}r[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.JumpIconsComponent=void 0;var r=function(){function t(){var t=this;this.asyncCheck=function(e,r,i){return void 0===r&&(r=100),void 0===i&&(i=1e3),n(t,void 0,void 0,(function(){return o(this,(function(t){return[2,new Promise((function(t){var n=function(o){void 0===o&&(o=0);var s=e();null!=s||o>i/r?t(s):setTimeout((function(){return n(++o)}),r)};n()}))]}))}))}}return t.prototype.onInit=function(){this.socialList(),this.pathColor(),this.updateHTML()},t.prototype.updateHTML=function(){for(var t=document.getElementById("social-logo-layout"),e=document.getElementById("flex-horizontal"),n=0,o=this.social;n<o.length;n++){var r=o[n],i=t.cloneNode(!0);i.querySelector("#icon").href=r.url,i.querySelector(".social-logo").src=r.icon,e.appendChild(i)}t.remove()},t.prototype.socialList=function(){this.social=[{name:"Instagram",url:"https://www.instagram.com/andrewmartin791/",icon:"/src/assets/icons/instagram.svg"},{name:"Coolapk",url:"http://www.coolapk.com/u/620606",icon:"/src/assets/icons/coolapk.svg"},{name:"PlayStore",url:"https://play.google.com/store/apps/dev?id=6609504255163731953",icon:"/src/assets/icons/bxl-play-store.svg"},{name:"Github",url:"https://github.com/shadowmelds",icon:"/src/assets/icons/github.svg"},{name:"网易云音乐",url:"https://music.163.com/#/user/home?id=280851189",icon:"/src/assets/icons/music163.svg"}]},t.prototype.pathColor=function(){return n(this,void 0,void 0,(function(){var t;return o(this,(function(e){switch(e.label){case 0:return[4,this.asyncCheck((function(){return document.querySelector("path")}))];case 1:return e.sent(),document.querySelectorAll("path"),t=document.createElement("style"),document.head.appendChild(t),t.sheet.insertRule(".social-logo:hover path{fill: white;}"),[2]}}))}))},t}();e.JumpIconsComponent=r}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,n),i.exports}n(7735),n(1186)})();