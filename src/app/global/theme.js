init();
function init() {
    var Mode = document.cookie.split(";")[0].split("=")[1];
    var html = document.querySelector('HTML');
    // 暗色模式
    if (Mode === '1') {
        html.className = 'dark';
    }
    else {
        html.className = 'light';
    }
}
//# sourceMappingURL=theme.js.map