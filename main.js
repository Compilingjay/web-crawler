import { crawl_page, print_report } from "./crawl.js";

async function main() {
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
    try {
        const pages = await crawl_page(url);
        print_report(pages);
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

await main()