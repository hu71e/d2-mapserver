import { NodeCanvasRenderingContext2D } from "canvas";
import { Level } from "../../types/level.type";
import { RequestConfig } from "../../types/RequestConfig";

export async function drawWalls(ctx: NodeCanvasRenderingContext2D, levelData: Level, scale: number, reqConfig: RequestConfig) {
  // this part generates the walls (collisions as it's called)
  const fullWidth = levelData.size.width * scale;
  levelData.map.forEach((coord, index) => {
    let fill = false;
    let x = scale;
    let y = index * scale;
    const lastCoord = coord.length -1;
    coord.forEach((plotx, idx) => {
      // only the first (every odd) number is used
      // the second value is void space and not necessary
      let width = plotx * scale;
      fill = !fill;
      if (!fill) {
        ctx.beginPath();
        ctx.fillStyle = reqConfig.wallColor;
        ctx.fillRect(x, y, width, scale);
        ctx.stroke();
      }
      x = x + width;
      if ((idx == lastCoord) && fill) {
        const extrax = fullWidth - x;
        // console.log(`x: ${x} ${extrax} ${fullWidth}`);
        ctx.beginPath();
        ctx.fillStyle = reqConfig.wallColor;
        ctx.fillRect(x, y, extrax, scale);
        ctx.stroke();
      }
    });
  });
}
