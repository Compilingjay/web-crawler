function main() {
    const argv = process.argv;
    if (argv.length < 3) {
        console.log("Website url not provided");
        process.exit(1);
    } else if (argv.length > 3) {
        console.log("Too many arguments provided");
        process.exit(2);
    }

    console.log(`Crawler beginning at: ${argv[2]}`);
}

main()