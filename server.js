import yaml from "yaml";
import toml from "toml";
import fs from "fs";

const tomlFileName = "./conf.toml";
const tomlFile = fs.readFileSync(tomlFileName, "utf8");
const _toml = toml.parse(tomlFile);

const yamlFileName = "./conf.yaml";
const yamlFile = fs.readFileSync(yamlFileName, "utf8");
const _yaml = toml.parse(yamlFile);

console.log({ ..._yaml });
