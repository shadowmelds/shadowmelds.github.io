init();

// 当页面返回时加载 亮/暗色主题
window.addEventListener('pageshow', function(event) {
    // 如果页面是读取缓存
    if (event.persisted) {
        init();
    }
});

// 加载 亮/暗色主题
function init() {

    const mode = document.cookie.split(";")[0].split("=")[1];
    const html = document.querySelector('HTML')

    // 暗色模式
    if (mode === '1') {
        html.className = 'dark'
    } else {
        html.className = 'light'
    }
}