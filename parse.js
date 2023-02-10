import fs from "fs";
import { formatFile, formatRows } from "./format.js";

const operators = {
    1: { "#": 1, "*": 1 },
    2: {},
};

const state = {
    blocks: [
        {
            vars: {},
        },
    ],
    tree: [],
};

export function parseFile(file) {
    file = file.trim();
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

export function getRows(file) {
    return file
        .split("\n")
        .map((row) => row.trim())
        .filter((n) => !!n);
}

export function parseRows(rows) {}

function parseRow(row) {
    runRow(row, (v, i) => {});
}
