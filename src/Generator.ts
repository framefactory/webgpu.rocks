/**
 * WebGPU.rocks - Quick Reference
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import {
    DictionaryType,
    EnumType,
    OperationMemberType,
    ConstructorMemberType,
    AttributeMemberType,
    ConstantMemberType,
    DictionaryMemberType,
    IDLRootType,
    IDLTypeDescription,
    Argument,
    AbstractBase,
    InterfaceMixinType,
    TypedefType,
    InterfaceType,
    IDLInterfaceMemberType,
    DeclarationMemberType,
    FieldType,
} from "webidl2";

import { idlTypeKeys, IDLTypes, EIDLType, MergedInterfaceType, ICreatorOperation } from "./sorter";

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

////////////////////////////////////////////////////////////////////////////////

export default class Generator
{
    readonly types: IDLTypes;

    constructor(types: IDLTypes)
    {
        this.types = types;
    }

    getReference(): string
    {
        const html: string[] = [];
        html.push('<div class="idl-reference">');
 
        html.push(idlTypeKeys.map(key => this.getReferenceForType(key)).join("\n"));
 
        html.push('</div>');
        return html.join("\n");
    } 

    protected getReferenceForType(typeName: EIDLType): string
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

    getSummary(node: AbstractBase, noDetails: boolean): string | null
    {
        switch(node.type) {
            case "interface":
                return this.getInterface(node as MergedInterfaceType, noDetails);
            case "interface mixin":
                return this.getMixin(node as InterfaceMixinType, noDetails);
            case "dictionary":
                return this.getDictionary(node as DictionaryType);
            case "enum":
                return this.getEnum(node as EnumType);
            case "typedef":
                return this.getTypedef(node as TypedefType);
            default:
                return null;
        }
    }

    getInterface(node: MergedInterfaceType, noDetails: boolean)
    {
        const html: string[] = [];
        html.push('<div class="idl-interface">');
        html.push(`<h2>${node.name}</h2>`);
        
        const creators = this.types.creators[node.name];
        if (creators) {
            html.push('<ul class="idl-creators">');
            creators.forEach(creator => html.push(this.getCreator(creator, noDetails)));
            html.push('</ul>');
        }

        html.push(this.getMemberList(node, noDetails));

        html.push("</div>");
        return html.join("\n");
    }

    getMemberList(node: MergedInterfaceType | InterfaceMixinType, noDetails: boolean): string
    {
        const html: string[] = [];
        html.push('<ul class="idl-members">');

        node.members.forEach((member: IDLInterfaceMemberType) => {
            switch(member.type) {
                case "constructor":
                    html.push(`<li class="idl-member">${this.getConstructor(member)}</li>`);
                    break;
                case "operation":
                    html.push(`<li class="idl-member">${this.getOperation(member, noDetails)}</li>`);
                    break;
                case "attribute":
                    html.push(`<li class="idl-member idl-attribute">${this.getAttribute(member)}</li>`);
                    break;
                case "const":
                    html.push(`<li class="idl-member idl-const">${this.getConst(member)}</li>`);
                    break;
                case "setlike":
                case "maplike":
                case "iterable":
                    html.push(`<li class="idl-member idl-declaration">${this.getDeclaration(member)}</li>`);
                    break;
            }
        });
        html.push("</ul>");
        return html.join("\n");
    }

    protected getConstructor(member: ConstructorMemberType): string
    {
        const html: string[] = [];
    
        const args = member.arguments.map(arg => `${arg.name}: ${this.getType(arg.idlType)}`);
        const typeName = member.parent.name;
        const ret = `<a href="#idl-${typeName}" class="idl-type">${typeName}</a>`;

        html.push(`<span class="idl-constructor"><span class="idl-name">Constructor</span>(${args.join(", ")}): ${ret}</span>`);
        return html.join("\n");
    }

    protected getCreator(creator: ICreatorOperation, noDetails: boolean): string
    {
        const typeName = creator.type.name;
        const args = this.getArguments(creator.operation.arguments);
        const ret = this.getType(creator.operation.idlType);
        
        let content = `<a href="#idl-${typeName}" class="idl-type idl-${creator.type.type}">${typeName}</a>`;
        content += `.<span class="idl-name">${creator.operation.name}</span>(${args}): ${ret}`

        if (noDetails) {
            return `<span class="idl-creator">${content}</span>`;
        }

        const detail = this.getDetail(creator.operation.arguments);
        if (!detail) {
            return `<div class="idl-creator>${content}</div>`;
        }

        return `<details><summary class="idl-creator">${content}</summary>${detail}</details>`;
    }

    protected getOperation(member: OperationMemberType, noDetails: boolean): string
    {
        const args = this.getArguments(member.arguments);
        const ret = this.getType(member.idlType);
        const content = `<span class="idl-name">${member.name}</span>(${args}): ${ret}`;

        if (noDetails) {
            return `<span class="idl-operation">${content}</span>`;
        }

        const detail = this.getDetail(member.arguments);
        if (!detail) {
            return `<div class="idl-operation>${content}</div>`;
        }

        return `<details><summary class="idl-operation">${content}</summary>${detail}</details>`;
    }

    protected getDetail(args: Argument[]): string
    {
        // create a set with the names of all types with detail available
        const nameSet = new Set<string>();
        args.map(arg => this.getTypeNamesRecursive(arg.idlType))
            .flat()
            .filter(name => !!name && !!this.types.all[name])
            .forEach(name => nameSet.add(name));

        const types = Array.from(nameSet.values()).map(name => this.types.all[name]);
        if (types.length === 0) {
            return "";
        }

        const content = types.map(type => `<div class="idl-detail">${this.getSummary(type, true)}</div>`).join("\n");
        return `<div class="idl-detail-block">${content}</div>`;
    }

    protected getArguments(args: Argument[]): string
    {
        return args.map(arg => `<span class="idl-var">${arg.name}</span>: ${this.getType(arg.idlType)}`).join(", ");
    }

    protected getAttribute(member: AttributeMemberType): string
    {
        return `<span class="idl-name">${member.name}</span>: ${this.getType(member.idlType)}`;
    }

    protected getConst(member: ConstantMemberType): string
    {
        return `<span class="idl-name">${member.name}</span> = ${member.value["value"]}`;
    }

    protected getDeclaration(member: DeclarationMemberType): string
    {
        const typeArgs = member.idlType.map(t => this.getType(t));

        return `<span class="idl-name">${member.type}</span>&lt;${typeArgs}&gt;`;
    }

    protected getField(member: FieldType): string
    {
        return `<span class="idl-name">${member.name}</span>: ${this.getType(member.idlType)}${member.required ? '<span class="idl-required">required</span>' : ''}`;
    }

    protected getTypeNamesRecursive(idlType: IDLTypeDescription, level = 0): string[]
    {
        if (level > 1) {
            return [];
        }

        if (Array.isArray(idlType.idlType)) {
            return idlType.idlType.map(t => this.getTypeNamesRecursive(t, level)).flat();
        }

        if (idlType.generic) {
            return this.getTypeNamesRecursive(idlType.idlType, level);
        }

        const typeName = idlType.idlType as string;
        const type = this.types.all[typeName];

        if (!type) {
            return [];
        }

        if (type.type === "typedef") {
            return [ typeName, ...this.getTypeNamesRecursive(type.idlType, level) ];
        }
        if (type.type === "dictionary") {
            return [ typeName, ...type.members.map(m => this.getTypeNamesRecursive(m.idlType, level + 1)).flat()];
        }

        return [ typeName ];
    }

    protected getType(idlType: IDLTypeDescription): string
    {
        let typeName;
        const innerType = idlType.idlType;

        if (Array.isArray(innerType)) {
            const separator = idlType.union ? " | " : ", ";
            typeName = innerType.map(t => this.getType(t)).join(separator);
        }
        else {
            typeName = typeof innerType === "string" ? innerType : this.getType(innerType);
        }

        if (typeName === "undefined") {
            typeName = "void";
        }

        if (idlType.generic) {
            return `<span class="idl-type">${idlType.generic}</span>&lt;${typeName}&gt;`;
        }

        const type = this.types.all[typeName];

        if (type) {
            return `<a href="#idl-${typeName}" class="idl-type idl-${type.type}">${typeName}</a>`;
        }
    
        return `<span class="idl-type">${typeName}</span>`;
    }

    getMixin(node: InterfaceMixinType, noDetails = false): string
    {
        const html: string[] = [];
        html.push('<div class="idl-mixin">');
        html.push(`<h2>${node.name}</h2>`);
        
        html.push(this.getMemberList(node, noDetails));

        html.push("</div>");
        return html.join("\n");
    }

    getDictionary(node: DictionaryType): string
    {
        const html: string[] = [];
        html.push('<div class="idl-dictionary">');
        html.push(`<h2>${node.name}</h2>`);

        html.push('<ul class="idl-members">');
        node.members.forEach(m => html.push(`<li class="idl-member idl-field">${this.getField(m)}</li>`));
        html.push("</ul>");

        html.push('</div>');
        return html.join("\n");
    }

    getEnum(node: EnumType): string
    {
        const html: string[] = [];
        html.push('<div class="idl-enum">');
        html.push(`<h2>${node.name}</h2>`);
        html.push(this.getEnumValueString(node));
        html.push('</div>');

        return html.join("\n");
    }

    getEnumValueList(node: EnumType): string
    {
        const html: string[] = [];
        html.push('<ul class="idl-enum-values">');
        node.values.forEach(v => html.push(`<li class="idl-enum-value">${v.value}</li>`));
        html.push('</ul>');

        return html.join("\n");
    }

    getEnumValueString(node: EnumType): string
    {
        const html: string[] = [];
        html.push('<div class="idl-enum-values idl-member">');
        html.push(node.values.map(v => `'${v.value}'`).join(", "));
        html.push('</div>');

        return html.join("\n");
    }

    getTypedef(node: TypedefType): string
    {
        const html: string[] = [];
        html.push('<div class="idl-typedef">');
        html.push(`<h2>${node.name}</h2>`);
        html.push(`<div class="idl-member">typedef ${node.name} = ${this.getType(node.idlType)}</div>`);
        html.push('</div>');

        return html.join("\n");
    }

    getTypeName(node: AbstractBase, link: boolean | string)
    {
        const typeName = node["name"] || node["target"];
        if (!typeName) {
            throw new Error("failed to retrieve type name");
        }

        if (link) {
            const linkTarget = typeof link === "string" ? link : `#idl-${typeName}`;
            return `<a href="${linkTarget}" class="idl-type">${typeName}</a>`;
        }

        return `<span class="idl-type">${typeName}</span>`;
    }
}
