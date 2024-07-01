import { test, expect } from "@jest/globals";
import { normalize_URL, get_URLs_from_HTML } from "./crawl.js";


const url = "boot.dev/path";
const base_url = "https://boot.dev";


test("normalize_URL() - 1", () => {
    expect(normalize_URL("https://blog.boot.dev/path/") === url);
});

test("normalize_URL() - 2", () => {
    expect(normalize_URL("https://blog.boot.dev/path") === url);
})

test("normalize_URL() - 3", () => {
    expect(normalize_URL("http://blog.boot.dev/path/") === url);
})

test("normalize_URL() - 4", () => {
    expect(normalize_URL("http://blog.boot.dev/path") === url);
})

test("normalize_URL() - 5", () => {
    expect(normalize_URL("http://boot.dev/path") === url);
})

test("normalize_URL() - 6", () => {
    expect(normalize_URL("http://blog.boot.dev/path?q=80") == url);
})

test("normalize_URL() - 7", () => {
    expect(normalize_URL("http://blog.boot.dev:8080/path") == url);
})

test("normalize_URL() - 8", () => {
    expect(normalize_URL("http://user:abcdef@blog.boot.dev:8080/path") == url);
})


test("get_URLs_from_HTML() - 1", () => {
    expect(
        get_URLs_from_HTML(
            "<a href=\"/path\">Text<</a>", base_url) === url);
});

test("get_URLs_from_HTML() - 2", () => {
    expect(
        !(get_URLs_from_HTML(
            "<html>\n\t<body>\n\t\t<a href=\"https://boot.dev/path\"><span>Go to Boot.dev</span></a>\n\t</body>\n</html>",
            base_url) === url));
})