import { Level, ObjectType } from "../../types/level.type";
import * as fs from "fs";
import { drawImage } from "./drawPrimatives";
import { NodeCanvasRenderingContext2D } from "canvas";

export async function drawIcons(ctx: NodeCanvasRenderingContext2D, levelData: Level, scale: number) {
  levelData.objects.forEach(async (mapObject) => {
    let x = mapObject.x * scale;
    let y = mapObject.y * scale;

    // Exits
    if (mapObject.type === ObjectType.Exit) {
      if (levelData.id === 46) {
        let fileName = "";
        switch (mapObject.id) {
          case 69:
            fileName = "./build/static/talrasha-circle.png";
            break;
          case 70:
            fileName = "./build/static/talrasha-chevron.png";
            break;
          case 71:
            fileName = "./build/static/talrasha-triangle.png";
            break;
          case 72:
            fileName = "./build/static/talrasha-circleline.png";
            break;
          case 66:
            fileName = "./build/static/talrasha-star.png";
            break;
          case 67:
            fileName = "./build/static/talrasha-square.png";
            break;
          case 68:
            fileName = "./build/static/talrasha-crescent.png";
            break;
        }
        if (fs.existsSync(fileName)) {
          drawImage(ctx, x-47, y-10, fileName, 50, 50);
        }
      }
    }
  });
}

