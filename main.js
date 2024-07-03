import { crawl_page } from "./crawl.js";

function main() {
    const argv = process.argv;
    if (argv.length < 3) {
        console.log("Website url not provided");
        process.exit(1);
    } else if (argv.length > 3) {
        console.log("Too many arguments provided");
        process.exit(2);
    }

    const url = argv[2]
    console.log(`Crawler beginning at: ${url}`);
    const pages = crawl_page(url)
    console.log(pages)
}

main()