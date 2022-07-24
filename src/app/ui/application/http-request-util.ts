export function loadJson(url, request) {
    let xmlHttp: XMLHttpRequest;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        console.log('浏览器不支持');
    }

    if (xmlHttp != null) {
        xmlHttp.open('get',url, true)
        xmlHttp.send();
        xmlHttp.onload = () => {
            if (xmlHttp.status === 200) {
                request(xmlHttp.responseText)
            }
        }
    }
}