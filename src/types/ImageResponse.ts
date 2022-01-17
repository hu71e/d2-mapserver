import { LevelImage } from "./LevelImage";

export class ImageResponse {
    
    leftTrimmed: number;
    topTrimmed: number;
    offsetx: number;
    offsety: number;
    mapwidth: number;
    mapheight: number;
    exits: string;
    waypoint: string;
    bosses: string;
    quests: string;
    serverScale: number;
    base64Data: string;

    mapName: string;
    mapId: number;

    constructor(levelImage: LevelImage, base64Data: string) {
        this.leftTrimmed = levelImage?.leftTrimmed
        this.topTrimmed = levelImage?.topTrimmed
        this.offsetx = levelImage.mapData?.offset.x
        this.offsety = levelImage?.mapData.offset.y
        this.mapwidth = levelImage?.mapData.size.width
        this.mapheight = levelImage?.mapData.size.height
        this.exits = levelImage?.exits
        this.waypoint = levelImage?.waypoint
        this.bosses = levelImage?.bosses
        this.quests = levelImage?.quests
        this.serverScale = levelImage?.serverScale
        this.base64Data = base64Data

        this.mapName = levelImage.mapData?.name;
        this.mapId = levelImage.mapData?.id;
    }
}