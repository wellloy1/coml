import fs from "fs";

export function formatRows(rows) {
    const newRows = [];
    let previousEmptyRowExists = false;
    let notEmptyRowExists = false;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim();
        if (!!row) {
            newRows.push(row);
            notEmptyRowExists = true;
            previousEmptyRowExists = false;
            continue;
        }
        if (!notEmptyRowExists) {
            continue;
        }
        if (!previousEmptyRowExists) {
            newRows.push(row);
            previousEmptyRowExists = true;
        } else continue;
    }
    return newRows;
}

export function formatFile(src) {
    let file = fs.readFileSync(fileName, "utf8");
    const rows = file.split("\n");
    const formattedRows = formatRows(rows);
    fs.writeFileSync(src, formattedRows.join("\n"), "utf8");
}
