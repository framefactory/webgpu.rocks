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
import { sort, EIDLType, MergedInterfaceType } from "./sorter";
import Generator from "./Generator";

////////////////////////////////////////////////////////////////////////////////

(async function main() {
    const specPath = path.resolve(__dirname, "../libs/gpuweb/spec/index.bs")
    const blocks = await parseBikeShedFile(specPath);

    const idlTypes = sort(blocks.idl);
    
    // const creatorKeys = Object.keys(idlTypes.creators);
    // creatorKeys.forEach(key => {
    //     const creators = idlTypes.creators[key];
    //     const creator = creators[0];
    //     console.log(`Creator for '${key}' (${creators.length}): ${creator.type.name}.${creator.operation.name}`);
    // });

    const generator = new Generator(idlTypes);
    
    const html = generator.generateReference();
    const refPath = path.resolve(__dirname, "../data/reference.html");
    fs.writeFileSync(refPath, html);

    const dataTypesPath = path.resolve(__dirname, "../data/types");
    mkdirp(dataTypesPath);

    const contentTypesPath = path.resolve(__dirname, "../content/types");
    mkdirp(contentTypesPath);
    
    idlTypes[EIDLType.Interface].forEach(iface => {
        const json = JSON.stringify(iface, null, 4);
        fs.writeFileSync(path.resolve(dataTypesPath, `${iface.name}.json`), json);

        const html = generator.generateInterface(iface);
        fs.writeFileSync(path.resolve(contentTypesPath, `${iface.name}.html`), html);    
    });
})();

