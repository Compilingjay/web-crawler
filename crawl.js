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

async function crawl_page(base_URL, current_URL = base_URL, pages = {}) {
    const domain = new URL(current_URL).domain;
    if (domain !== base_URL) {
        return;
    }

    const normalized_url = normalize_URL(current_URL);
    if (normalized_url in pages) {
        pages[normalized_url] += 1;
        return pages;
    }

    pages[normalized_url] = 1;

    try {
        const html = await fetch_page_HTML(current_URL);
        if (!html) {
            return pages;
        }

        const urls = get_URLs_from_HTML(html)
        for (const url of urls) {
            crawl_page(base_URL, url, pages);
        }
    } catch (err) {
        console.log(`Err: ${err.message}`);
    }

    return pages;
}

async function fetch_page_HTML (url) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/html',
        }
    })

    if (response.status >= 400) {
        console.log(`Error ${response.status}, failed to fetch "${current_URL}"`);
        return;
    }

    if (content_type != "text/html") {
        console.log(`Invalid content-type "${content_type}" when fetching "${current_URL}"`);
        return;
    }
    
    const html = await response.text()
    return html;
}

export { normalize_URL, get_URLs_from_HTML, crawl_page };