/**
 * WebGPU.rocks - Quick Reference
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import * as sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";

import { parseBikeShedFile } from "./parser";
import { sort, EIDLType, MergedInterfaceType, idlTypeKeys } from "./sorter";
import Generator from "./Generator";

////////////////////////////////////////////////////////////////////////////////

(async function main() {
    const specPath = path.resolve(__dirname, "../libs/gpuweb/spec/index.bs")
    const blocks = await parseBikeShedFile(specPath);

    const idlTypes = sort(blocks.idl);
    const generator = new Generator(idlTypes);

    //console.log(JSON.stringify(idlTypes.all["GPUBindGroupLayoutDescriptor"], null, 4));

    const html = generator.getReference();
    const refPath = path.resolve(__dirname, "../data/reference.html");
    fs.writeFileSync(refPath, html);

    const dataTypesPath = path.resolve(__dirname, "../data/types");
    mkdirp.sync(dataTypesPath);

    const contentTypesPath = path.resolve(__dirname, "../content/types");
    const allKeys = Object.keys(idlTypes.all);

    const frontMatter = "---\nheadless: true\n---\n\n";

    allKeys.forEach(key => {
        const node = idlTypes.all[key];
        const html = generator.getSummary(node, false);
        if (html) {
            const type = node.type === "interface mixin" ? "mixin" : node.type;
            const name = node["name"];

            const basePath = path.resolve(contentTypesPath, type);
            mkdirp.sync(basePath);

            const filePath = path.resolve(basePath, name + ".html");
            fs.writeFileSync(filePath, frontMatter + html);
        }
    });

})();

