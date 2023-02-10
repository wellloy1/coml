const args = process.argv.filter((val, i) => ![1, 1][i]);

const commands = {
    f: formatFile,
};

const options = {
    f: {
        "-f": 1,
    },
};

args.forEach((fileName) => {
    formatFile(fileName);
    console.log(`'${fileName}' has been formatted`);
});

console.log(args);
