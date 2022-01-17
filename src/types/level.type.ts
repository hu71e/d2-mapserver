export interface LevelList {
    id?: string;
    seed: string;
    difficulty: string;
    levels: Level[]
}

export interface Level {
    type:    LevelType;
    id:      number;
    name:    string;
    offset:  Offset;
    size:    Size;
    objects: Object[];
    map:     Array<number[]>;
}

export interface Object {
    id:             number;
    type:           ObjectType;
    x:              number;
    y:              number;
    name?:          string;
    op?:            number;
    class?:         string;
    isSuperUnique?: boolean;
    superId?:       number;
    isGoodExit?:    boolean;
}

export enum ObjectType {
    Exit = "exit",
    NPC = "npc",
    Object = "object",
}

export interface Offset {
    x: number;
    y: number;
}

export interface Size {
    width:  number;
    height: number;
}

export enum LevelType {
    Map = "map",
}
