/**
 * WebGPU.rocks - Quick Reference
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

export interface IParsedBlocks
{
    dfn: Map<string, any[]>;
    ts: Map<string, any[]>;
    exposed: Set<string>;
}