import { NodeCanvasRenderingContext2D } from "canvas";
import { Level, Object } from "../../types/level.type";
import { drawCircle, drawText } from "./drawPrimatives";

export async function drawVerboseObjects(
  ctx: NodeCanvasRenderingContext2D,
  levelData: Level,
  scale: number
) {
  const fontSize: number = 16;
  levelData.objects.forEach(async (mapObject: Object) => {
    let x = mapObject.x * scale;
    let y = mapObject.y * scale;

    let lblArr = [mapObject.id.toString()];
    if (mapObject.type) lblArr.push(mapObject.type);
    if (mapObject.name) lblArr.push(mapObject.name);
    if (mapObject.class) lblArr.push(mapObject.class);
    const objLabel = lblArr.join(" - ");
    drawText(ctx, x, y, 12, objLabel, "#FF0");
    drawCircle(ctx, x, y, scale * 2, "#FF0");
  });
}
