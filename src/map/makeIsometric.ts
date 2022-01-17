import { createCanvas } from "canvas";
import { Level } from "../types/level.type";
import trimCanvas from "trim-canvas";
import { LevelImage } from "../types/LevelImage";

export async function makeIsometric(levelImage: LevelImage): Promise<LevelImage> {
    const levelData: Level = levelImage.mapData;
    // make the image isometric
    const padding = levelImage.padding;
    const scale = levelImage.serverScale;
    const mapWidth = levelData.size.width * scale + padding;
    const mapHeight = levelData.size.height * scale + padding;
    const hypot = Math.sqrt(mapWidth * mapWidth + mapHeight * mapHeight) + padding;
    const canvas2 = createCanvas(hypot, hypot);
    const ctx2 = canvas2.getContext("2d");
    ctx2.translate(hypot / 2, hypot / 2);
    ctx2.scale(1, 0.5);
    ctx2.rotate((45 * Math.PI) / 180);
    ctx2.translate(-(mapWidth / 2), -(mapHeight / 2));
    ctx2.drawImage(levelImage.canvas, padding / 2, padding / 2);

    // trim empty space
    trimCanvas(ctx2.canvas);
    levelImage.canvas = canvas2;
    return levelImage;
}