#!/usr/bin/env node
import fs from "fs";
import { parseFile, parseRows, getRows } from "./parse.js";
import { formatFile, formatRows } from "./format.js";

const fileName = "./config.yml";
const coml = fs.readFileSync(fileName, "utf8");

const data = parseFile(coml);

console.log(data);
