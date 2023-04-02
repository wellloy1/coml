import fs from "fs";
import { formatFile, formatRows } from "./format.js";

const varFirstChars = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const varChars = varFirstChars + "0123456789";
const numChars = "0123456789e.";

// const chars = {
//     vars: {
//         string: {},
//     },
//     nums: {},
//     math: {
//         "*": {},
//         "/": {},
//         "-": {},
//         "+": {},
//     },
//     seps: {
//         " ": {
//             rules: { string: rule.skip, vars: rule.end },
//             closer: null,
//         },
//         ",": {
//             action: null,
//             closer: null,
//         },
//         ":": {
//             action: null,
//             closer: null,
//         },
//         "[": {
//             action: null,
//             closer: "]",
//         },
//         '"': {
//             closer: '"',
//         },
//         "'": {
//             action: null,
//             closer: "'",
//         },
//         "`": {
//             action: null,
//             closer: "`",
//         },
//     },
//     comment: {
//         "#": {
//             action: null,
//             closer: null,
//             mode: modes.comment,
//         },
//     },
// };

function createRule(options) {
    const rule = {};
    const chars = options.chars.join();
    for (const char of chars) {
        charHandler[char] = {
            fn: options.fn,
            args: options.args,
            closer: options.closer,
        };
    }
    return rule;
}

function createRules(options) {
    const rules = {};
    const chars = options.chars.join();
    for (const char of chars) {
        rules[char] = {
            fn: options.fn,
            args: options.args,
        };
    }
}

const terminators = {
    never: () => {},
    newRow: () => {},
    closer: () => {},
};

const modes = {
    handleEntry: (char, rules) => {
        try {
            const handlers = rules[char];
            for (const handler of Object.values(handlers)) {
                const fn = handler[0];
                const arg = handler[1];
                fn(arg);
            }
        } catch (err) {
            // throw new Error("Unexpected character", {
            //     cause: {
            //         char,
            //         ri: state.ri,
            //         ci: state.ci,
            //     },
            // });
            throw err;
        }
    },
    skip: () => {},
};

const fns = {
    skip: () => {},
    setCtx: (name) => {
        state.ctx = name;
        state.mode = ctx[name].mode.name;
    },
    saveChar: () => {
        state.cache.push(state.char);
    },
    close: () => {},
};

const ctx = {
    global: {
        mode: modes.handleEntry,
        rules: {
            " ": { 0: [fns.skip] },
            "#": { 0: [fns.setCtx, "inlineComment"] },
            "[": { 0: [fns.setCtx, "namespace"] },
            ...createRules({
                chars: [varFirstChars],
                rules: { 0: [fns.setCtx, "namespace"] },
            }),
        },
        terminator: "never",
    },
    varName: {
        mode: modes.handleChar,
        rules: {
            " ": {
                0: [fns.close],
                1: [fns.setCtx, "inlineString"],
            },
            ":": { 0: [fns.close], 1: [fns.saveChar] },
            ...createRules({
                chars: [varChars],
                rules: { 0: [fns.setCtx, "namespace"], 1: [fns.saveChar] },
            }),
        },
        terminator: "closer",
    },
    inlineComment: {
        mode: modes.skip,
        terminator: "newRow",
    },
    // awaitInlineStringValue: {
    //     chars: [],
    //     lifeTime: lifeTimes.row,
    // },
    // inlineStringValue: {
    //     chars: [],
    //     lifeTime: lifeTimes.row,
    // },
    // namespace: {
    //     chars: [],
    //     lifeTime: lifeTimes.closer,
    // },
    // awaitNamespaceValue: {
    //     chars: [],
    //     lifeTime: lifeTimes.closer,
    // },
};

const state = {
    cache: [], // use as stack: unshift/shift
    opers: [], // use as stack: unshift/shift
    vars: [], // use as stack: unshift/shift
    closer: [], // use as stack: unshift/shift
    breaker: [], // use as stack: unshift/shift
    ctx: [],
    mode: [],
    ri: 0,
    ci: 0,
    result: {},
    error: null,
    char: null,
};

export function parseFile(file) {
    fns.setCtx("global");
    const rows = getRows(file);
    runRows(rows, (row) => {
        state.ci = 0;
        runRow(row, (char) => {
            state.char = char;
            console.log({
                ctx: state.ctx,
                mode: state.mode,
                ri: state.ri,
                ci: state.ci,
                char,
            });
            const rules = ctx[state.ctx].rules;
            ctx[state.ctx].mode(char, rules);
        });
    });
    console.log(state.cache);
    return state.result;
}

export function getRows(file) {
    return file
        .split("\n")
        .map((row) => row.trim())
        .filter((n) => !!n);
}

function runRows(rows, fn) {
    const l = rows.length;
    while (state.ri < l) {
        fn(rows[state.ri], state.ri);
        state.ri++;
    }
}

function runRow(row, fn) {
    const l = row.length;
    while (state.ci < l) {
        fn(row[state.ci], state.ci);
        state.ci++;
    }
}

export function parseRows(rows) {}

export function parseRow(row) {
    runRow(row, (char, ci) => {});
}
