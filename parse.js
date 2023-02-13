import fs from "fs";
import { formatFile, formatRows } from "./format.js";

class Parser {
    constructor() {}
}

const rules = {
    default(char, ri) {
        this.notStrings;
    },
};

const firstVars = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const firstNums = "0123456789";
const nextVars = firstVars + firstNums;
const nextNums = "e0123456789";

const chars = {
    vars: {
        first: firstVars,
        next: nextVars,
    },
    nums: {
        first: firstNums,
        next: nextNums,
    },
    math: {
        "*": {},
        "/": {},
        "-": {},
        "+": {},
    },
    seps: {
        " ": {
            action: { string: {}, vars: {} },
            closer: null,
        },
        ",": {
            action: null,
            closer: null,
        },
        ":": {
            action: null,
            closer: null,
        },
        "[": {
            action: null,
            closer: "]",
        },
        '"': {
            closer: '"',
        },
        "'": {
            action: null,
            closer: "'",
        },
        "`": {
            action: null,
            closer: "`",
        },
    },
    comment: {
        "#": {
            closer: null,
        },
    },
};

const modes = {
    entry: {
        allowed: [chars.legalFirstChars],
    },
};

const scopes = {
    global: {
        $: {},
        scopes: {},
    },
};

const state = {
    cache: [], // use as stack: unshift/shift
    opers: [], // use as stack: unshift/shift
    vars: [], // use as stack: unshift/shift
    closer: [], // use as stack: unshift/shift
    breaker: [], // use as stack: unshift/shift
    mode: modes.default,
    rule: rules.recon,
};

const result = {};
const error = {};

function handler(...args) {
    console.log(args);
}

export function getRows(file) {
    return file
        .split("\n")
        .map((row) => row.trim())
        .filter((n) => !!n);
}

function runRows(rows, fn, ri = 0) {
    const l = rows.length;
    while (ri < l) {
        fn(rows[ri], ri);
        ri++;
    }
}

function runRow(row, fn, ci = 0) {
    const l = row.length;
    while (ci < l) {
        fn(row[ci], ci);
        ci++;
    }
}

export function parseRows(rows) {}

export function parseRow(row) {
    runRow(row, (char, ci) => {});
}

export function parseFile(file) {
    const rows = getRows(file);
    runRows(rows, (row, ri) => {
        runRow(row, (char, ci) => {
            handler(char, ci);
        });
    });
}
