#!/usr/bin/env node
import fs from "fs";
import { parseFile, parseRows, getRows } from "./parse.js";
import { formatFile, formatRows } from "./format.js";

const fileName = "./config.yml";
const file = fs.readFileSync(fileName, "utf8");

parseFile(file);
