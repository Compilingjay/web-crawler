import { JSDOM } from 'jsdom';


function normalize_URL(url) {
    const url_obj = new URL(url);
    return url_obj.hostname + url_obj.pathname;
}

function get_URLs_from_HTML(html_body, base_URL) {
    console.log(html_body);
    const dom = new JSDOM(html_body);
    const anchors = dom.window.document.querySelectorAll('a');
    const arr = [];
    for (const a of anchors) {
        arr.push(base_URL + a.href);
    }
    return arr;
}


export { normalize_URL, get_URLs_from_HTML };