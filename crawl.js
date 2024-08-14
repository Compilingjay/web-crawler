import { JSDOM } from 'jsdom';

function normalize_URL(url) {
    const url_obj = new URL(url);
    let full_path = `${url_obj.host}${url_obj.pathname}`;
    if (full_path.slice(-1) === '/') {
        full_path = full_path.slice(0, -1);
    }

    return full_path;
}

function get_URLs_from_HTML(html_body, base_URL) {
    const dom = new JSDOM(html_body);
    const anchors = dom.window.document.querySelectorAll('a');
    const urls = [];

    for (const a of anchors) {
        if (a.hasAttribute("href")) {
            let href = a.getAttribute("href");

            try {
                href = new URL(href, base_URL).href;
                urls.push(href);
            } catch (err) {
                console.log(`Error: ${err.message}, ${href}`);
            }
        }
    }

    return urls;
}

async function fetch_page_HTML (url) {
    let response;
    try {
        response = await fetch(url);
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }

    if (response.status >= 400) {
        throw new Error(`Error: ${response.status} ${response.statusText}, failed to fetch "${url}"`);
    }

    const content_type = response.headers.get("content-type");
    if (!content_type || !content_type.includes("text/html")) {
        throw new Error(`Invalid content-type "${content_type}" when fetching "${url}"`);
    }
    
    return response.text();
}

async function crawl_page(base_URL, current_URL = base_URL, pages = {}) {
    const URL_base = new URL(base_URL);
    const URL_current = new URL(current_URL);

    if (URL_base.hostname !== URL_current.hostname) {
        return pages;
    }

    const normalized_url = normalize_URL(current_URL);
    if (pages[normalized_url] > 0) {
        pages[normalized_url] += 1;
        return pages;
    }

    pages[normalized_url] = 1;

    console.log(`Crawling ${current_URL}`)
    let html = '';
    try {
        html = await fetch_page_HTML(current_URL);
    } catch (err) {
        console.log(`Error: ${err.message}, ${current_URL}`);
        return pages;
    }

    const urls = get_URLs_from_HTML(html, base_URL)
    for (const url of urls) {
        pages = await crawl_page(base_URL, url, pages);
    }

    return pages;
}

export { normalize_URL, get_URLs_from_HTML, crawl_page };