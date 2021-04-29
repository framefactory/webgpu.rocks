/**
 * WebGPU.rocks - Quick Reference
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import {
    OperationMemberType,
    ConstructorMemberType,
    AttributeMemberType,
    ConstantMemberType,
    DictionaryMemberType,
    IDLRootType,
    IDLTypeDescription,
} from "webidl2";

import { idlTypeKeys, IDLTypes, EIDLType, MergedInterfaceType } from "./sorter";

////////////////////////////////////////////////////////////////////////////////

export const typeNames = {
    [EIDLType.Interface]: "Interface",
    [EIDLType.InterfaceMixin]: "Mixin",
    [EIDLType.Namespace]: "Namespace",
    [EIDLType.Callback]: "Callback",
    [EIDLType.Dictionary]: "Dictionary",
    [EIDLType.Enum]: "Enum",
    [EIDLType.Typedef]: "Typedef",
    [EIDLType.Includes]: "Includes",
};

export const categoryTitles = {
    [EIDLType.Interface]: "Interfaces",
    [EIDLType.InterfaceMixin]: "Interface Mixins",
    [EIDLType.Namespace]: "Namespaces",
    [EIDLType.Callback]: "Callbacks",
    [EIDLType.Dictionary]: "Dictionaries",
    [EIDLType.Enum]: "Enums",
    [EIDLType.Typedef]: "Typedefs",
    [EIDLType.Includes]: "Includes",
};

export type MemberType =
    OperationMemberType |
    ConstructorMemberType |
    AttributeMemberType |
    ConstructorMemberType |
    DictionaryMemberType;

const _getTypeName = function(idlType: IDLRootType)
{
    switch(idlType.type) {
        case "interface":
        case "interface mixin":
        case "enum":
            return idlType.name;

    }
}

export default class Generator
{
    readonly types: IDLTypes;

    constructor(types: IDLTypes)
    {
        this.types = types;
    }

    generateInterface(iface: MergedInterfaceType)
    {
        const html: string[] = [];
        html.push(`<h2>${iface.name}</h2>`);
        
        const creators = this.types.creators[iface.name];
        if (creators) {
            html.push('<ul class="idl-creators">');
            creators.forEach(creator => {
                const typeName = creator.type.name;
                html.push('<li class="idl-creator">');
                html.push(`<a href="#idl-${typeName}" class="idl-type">${typeName}</a>`);
                html.push(`.${this.generateOperation(creator.operation)}`);
                html.push('</li>');
            });
            html.push('</ul>');
        }

        html.push("<ul>");
        const members = iface.members;
        members.forEach(member => {
            switch(member.type) {
                case "constructor":
                    html.push(`<li>${this.generateConstructor(member)}</li>`);
                    break;
                case "operation":
                    html.push(`<li>${this.generateOperation(member)}</li>`);
                    break;
                case "attribute":
                    html.push(`<li>${this.generateAttribute(member)}</li>`);
                    break;
                case "const":
                    html.push(`<li>${this.generateConst(member)}</li>`);
                    break;
                default:
                    console.warn(`unhandled member type: ${member.type} in interface ${iface.name}`);
                    break;
            }
        });
        html.push("</ul>");

        return html.join("\n");
    }

    protected generateConstructor(member: ConstructorMemberType)
    {
        const html = [];
    
        const args = member.arguments.map(arg => `${arg.name}: ${this.generateType(arg.idlType)}`);
        const typeName = member.parent.name;
        const ret = `<a href="#idl-${typeName}" class="idl-type">${typeName}</a>`;

        html.push(`<span class="idl-ctor">Constructor</span>(${args.join(", ")}): ${ret}`);
        return html.join("\n");
    }

    protected generateOperation(member: OperationMemberType)
    {
        const html = [];
    
        const args = member.arguments.map(arg => `${arg.name}: ${this.generateType(arg.idlType)}`);
        const ret = this.generateType(member.idlType);

        html.push(`<span class="idl-op">${member.name}</span>(${args.join(", ")}): ${ret}`);
        return html.join("\n");
    }

    protected generateAttribute(member: AttributeMemberType)
    {
        return `<span class="idl-attr">${member.name}</span>: ${this.generateType(member.idlType)}`;
    }

    protected generateConst(member: ConstantMemberType)
    {
        return `<span class="idl-const">${member.name}</span> = ${member.value["value"]}`;
    }

    protected generateType(idlType: IDLTypeDescription | IDLTypeDescription[])
    {
        if (Array.isArray(idlType)) {
            return idlType.map(el => this.generateType(el)).join(" | ");
        }
        if (idlType.generic) {
            return `${idlType.generic}<${this.generateType(idlType.idlType)}>`;
        }

        let typeName = idlType.idlType as string;
        if (typeName === "undefined") {
            typeName = "void";
        }

        if (!this.types.all[typeName]) {
            return `<span class="idl-type">${typeName}</span>`;
        }

        return `<a href="#idl-${typeName}" class="idl-type">${typeName}</a>`;
    }

    generateReference(): string
    {
        return idlTypeKeys.map(key => this.generateTypeReference(key)).join("\n");
    } 

    protected generateTypeReference(typeName: EIDLType): string
    {
        const typeList = this.types[typeName];
        if (typeList.length === 0) {
            return "";
        }

        const html: string[] = [];
        html.push(`<h2>${categoryTitles[typeName]}</h2>`);

        html.push("<ul>");
        typeList.forEach(entry => {
            html.push(`<li>${entry.name || entry.target}</li>`);
        });
        html.push("</ul>");

        return html.join("\n");
    }
}
