/**
 * WebGPU.rocks - Quick Reference
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import {
    IDLRootType,
    InterfaceType,
    InterfaceMixinType,
    NamespaceType,
    CallbackType,
    DictionaryType,
    EnumType,
    TypedefType,
    IncludesType,
    OperationMemberType,
} from "webidl2";

////////////////////////////////////////////////////////////////////////////////

export type MergedInterfaceType = InterfaceType & {
    includes: string[];
};

export enum EIDLType
{
    Interface = "interface",
    InterfaceMixin = "interface mixin",
    Namespace = "namespace",
    Callback = "callback",
    Dictionary = "dictionary",
    Enum = "enum",
    Typedef = "typedef",
    Includes = "includes",
}

export const idlTypeKeys: EIDLType[] = [
    EIDLType.Interface,
    EIDLType.InterfaceMixin,
    EIDLType.Namespace,
    EIDLType.Callback,
    EIDLType.Dictionary,
    EIDLType.Enum,
    EIDLType.Typedef,
    EIDLType.Includes,
];

export interface ICreatorOperation
{
    type: MergedInterfaceType | InterfaceMixinType;
    operation: OperationMemberType;
}

export interface IDLTypes
{
    all: Record<string, IDLRootType>;
    creators: Record<string, ICreatorOperation[]>;
    [EIDLType.Interface]: MergedInterfaceType[];
    [EIDLType.InterfaceMixin]: InterfaceMixinType[];
    [EIDLType.Namespace]: NamespaceType[];
    [EIDLType.Callback]: CallbackType[];
    [EIDLType.Dictionary]: DictionaryType[];
    [EIDLType.Enum]: EnumType[];
    [EIDLType.Typedef]: TypedefType[];
    [EIDLType.Includes]: IncludesType[];
}

export function sort(idlBlocks: Map<string, IDLRootType[]>): IDLTypes
{
    const idlTypes: IDLTypes = {
        all: {},
        creators: {},
        [EIDLType.Interface]: [],
        [EIDLType.InterfaceMixin]: [],
        [EIDLType.Namespace]: [],
        [EIDLType.Callback]: [],
        [EIDLType.Dictionary]: [],
        [EIDLType.Enum]: [],
        [EIDLType.Typedef]: [],
        [EIDLType.Includes]: [],
    };

    idlBlocks.forEach((block, key) => idlTypes.all[key] = mergeInterfaces(block));
    const typeNames = Object.keys(idlTypes.all);

    typeNames.forEach(typeName => {
        const idlType = idlTypes.all[typeName];

        // add to type category
        idlTypes[idlType.type].push(idlType);

        if (idlType.type === EIDLType.Interface || idlType.type === EIDLType.InterfaceMixin) {
            const iface = idlType as MergedInterfaceType | InterfaceMixinType;
            const ops = iface.members.filter(member => member.type === "operation") as OperationMemberType[];
            ops.forEach(op => {
                const retType = op.idlType;
                const retTypeName = (retType.generic ? retType.idlType[0].idlType : retType.idlType) as string;
                const retTypeObj = idlTypes.all[retTypeName];

                if (retTypeObj) {
                    const creators = idlTypes.creators[retTypeName]
                        || (idlTypes.creators[retTypeName] = []);
                    creators.push({ type: iface, operation: op });
                }
            });

            // sort interface members by type
            iface.members.sort((a, b) => {
                const typeA = a.type;
                const typeB = b.type;
                return typeA < typeB ? -1 : (typeA > typeB ? 1 : 0);
            });
        }
    });

    idlTypeKeys.forEach(key => {
        // for each category, sort types by name
        idlTypes[key].sort((a, b) => {
            const nameA = a.name || a.target;
            const nameB = b.name || b.target;
            return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
        });

        console.log(`[sorter] ${key}: ${idlTypes[key].length} items`);
    });

    return idlTypes;
}

export function mergeInterfaces(blocks: IDLRootType[]): IDLRootType
{
    if (blocks.length === 1) {
        return blocks[0];
    }

    const interfaceBlock = blocks.find(block => block.type === "interface" && block.partial === false) as MergedInterfaceType;
    if (!interfaceBlock) {
        console.log(blocks);
        throw Error("no non-partial interface block");
    }

    interfaceBlock.includes = [];

    blocks.forEach(block => {
        if (block === interfaceBlock) {
            return;
        }

        switch(block.type) {
            case "interface":
                if (block.inheritance) {
                    console.warn(`partial interface ${block.name} with inheritance: ${block.inheritance}`);
                }
                interfaceBlock.members = interfaceBlock.members.concat(block.members);
                interfaceBlock.extAttrs = interfaceBlock.extAttrs.concat(block.extAttrs);
                break;
            case "includes":
                interfaceBlock.includes.push(block.includes);
                break;
        }
    });

    return interfaceBlock;
}