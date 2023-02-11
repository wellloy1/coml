import fs from "fs";
import { formatFile, formatRows } from "./format.js";

const rules = {
    parse: (char, k) => {
        if (currOperator === null) {
        }
        const op = operators[char];
    },
    skip: () => {},
};

const modes = {
    strings: () => {},
    any: () => {},
    notStrings: () => {},
};

const operators = {
    "#": {
        rule: rules.skip,
    },
};

const legalFirstChars = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const legalChars = validFirstChars + "0123456789";
const quotes = {
    34: "'",
    39: '"',
    96: "`",
};

const scopes = {
    global: {
        $: {},
        scopes: {},
    },
};

const vars = {
    global: {},
};

const state = {
    cache: [], // use as stack: unshift/shift
    opers: [], // use as stack: unshift/shift
    vars: [], // use as stack: unshift/shift
    closer: [], // use as stack: unshift/shift
    breaker: [], // use as stack: unshift/shift
    mode: modes.notStrings,
    rule: rules.parse,
};

const result = {};
const error = {};

export function parseFile(file) {
    const rows = getRows(file);
    runRows(rows, (row, i) => {
        runRow(row, (char, k) => {
            state.rule(char, k);
        });
    });
}

export function getRows(file) {
    return file
        .split("\n")
        .map((row) => row.trim())
        .filter((n) => !!n);
}

function runRows(rows, fn, i = 0) {
    const l = rows.length;
    while (i < l) {
        fn(rows[i], i);
        i++;
    }
}

function runRow(row, fn, i = 0) {
    const l = row.length;
    while (i < l) {
        fn(row[i], i);
        i++;
    }
}

export function parseRows(rows) {}

function parseRow(row) {
    runRow(row, (v, i) => {});
}
