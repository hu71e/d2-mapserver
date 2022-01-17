import { NodeCanvasRenderingContext2D } from "canvas";
import { Level, ObjectType } from "../../types/level.type";
import { drawRectangle, drawImage, drawImageOutline } from "./drawPrimatives";

export async function drawObjects(ctx: NodeCanvasRenderingContext2D, levelData: Level, scale: number) {
  // this part adds the special objects (doors, waypoints etc)
  levelData.objects.forEach((mapObject) => {
    let x = (mapObject.x * scale) + scale - 1.5;
    let y = (mapObject.y * scale) + scale + 0.4;

    if (mapObject.type === ObjectType.Object) {
      // waypoints
      if (mapObject.name == "Waypoint") {
        let size = 25;
        drawRectangle(ctx, x - size + 7, y - size / 2 - 3, size, size, "#FFFF00");
        //drawImage(ctx, x+11, y+21, "./build/static/waypoint.png", scale * 15, scale * 10);
      }

      // chests
      if (mapObject.name == "chest") {
        let size = 8;
        drawImage(ctx, x+6, y+16, "./build/static/chest.png", size * 2, size * 1.8);
      }
      if (mapObject.id == 580) { // super chest
        let size = 8;
        //drawImage(ctx, x-12, y+25, "./build/static/superchest.png", scale * 12, scale * 20);
        drawImageOutline(ctx, x-28, y+15, "./build/static/superchest.png", size * 3.25, size * 5.75, "gold");
      }
      if (mapObject.id == 581) { // super chest
        let size = 8;
        drawImage(ctx, x+8, y+16, "./build/static/chest.png", size, size * 0.9);
      }
      
      if (mapObject.name == "Shrine") {
        drawImage(ctx, x-15, y+17, "./build/static/shrine.png", 20, 32);
      }

      if (mapObject.name == "Well") {
        drawImage(ctx, x+13, y+21, "./build/static/well.png", 22, 18);
      }

      // portals in act 5
      if (mapObject.name == "Portal") {
        if (mapObject.id == 60) {
          drawImageOutline(ctx, x+95, y+85, "./build/static/rightportal.png", 50, 46, "#FF00FF");
        }
      }

      // yellow doors
      if (mapObject.name == "door" || mapObject.name == "Door") {
        let size = scale * 3;
        // cat lvl 4
        if (mapObject.id == 47) {
          drawRectangle(ctx, x+1.8, y-0.8, scale * 3, (scale * 3)/2, "#FFFF00"); // vertical
        }
        switch(mapObject.id) {
          case 13:
          case 15:
          case 64:
          case 290: // harem
          case 292: // palace
          //case 294:
            drawRectangle(ctx, x+1.8, y-1.6, size/3, size, "#FFFF00"); // vertical
            break;
          case 14:
          case 16:
          case 291:
          // case 293:
          case 295:
            drawRectangle(ctx, x, y-0.3, size, size/3, "#FFFF00"); // horizontal
            break;
        }

        // stony tomb doors
        if (mapObject.id == 91) {
          drawRectangle(ctx, x+1.6, y, (scale * 3)/2, (scale * 3), "#FFFF00"); // vertical
        }
        if (mapObject.id == 92) {
          drawRectangle(ctx, x+3.5, y-0.7, (scale * 3), (scale * 3)/2, "#FFFF00"); // horizontal
        }

        // maggot lair doors
        if (mapObject.id == 230) {
          drawRectangle(ctx, x+1.6, y+2, (scale * 3)/2, (scale * 4), "#FFFF00"); // vertical
        }
        if (mapObject.id == 229) {
          drawRectangle(ctx, x+4, y-0.7, (scale * 4), (scale * 3)/2, "#FFFF00"); // horizontal
        }
      }
    }
  });
}
