import { NodeCanvasRenderingContext2D } from "canvas";
import { RequestConfig } from "../../types/RequestConfig";
import { Level, ObjectType } from "../../types/level.type";
import { drawRectangle, drawText } from "./drawPrimatives";

export async function drawExits(
  ctx: NodeCanvasRenderingContext2D,
  levelData: Level,
  scale: number,
  mapRefList,
  reqConfig: RequestConfig
) {
  levelData.objects.forEach((mapObject) => {
    let x = mapObject.x * scale;
    let y = mapObject.y * scale;

    // Exits
    if (mapObject.type === ObjectType.Exit) {
      let size = 2 * 10;
      drawRectangle(ctx, x - size / 2, y - size / 2, size, size, "#FF00FF");
      if (mapObject.isGoodExit == true && levelData.id == 46) {
        let size = 2 * 15;
        drawRectangle(ctx, x - size / 2, y - size / 2, size, size, "#00FF00");
      }
      // the id of the exit object is the id of the map
      const mapList = mapRefList.find((map) => map.id == mapObject.id);
      let mapLabel = mapList?.name ? mapList.name : "";
      if (mapLabel && reqConfig.showTextLabels) {
        if (levelData.id === 46) {
          // canyon of the magi doesnt need text
          mapLabel = "";
        }
        const fontSize: number = 16;
        drawText(ctx, x, y, fontSize, mapLabel, "#FFFFFF");
      }
    }
  });
}
