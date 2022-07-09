init();

window.addEventListener('pageshow', function(event) {
    // 如果页面是读取缓存
    if (event.persisted) {
        init();
    }
});

function init() {

    var Mode = document.cookie.split(";")[0].split("=")[1];
    const html = document.querySelector('HTML')

    // 暗色模式
    if (Mode === '1') {
        html.className = 'dark'
    } else {
        html.className = 'light'
    }
}