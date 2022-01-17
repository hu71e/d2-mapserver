import { NodeCanvasRenderingContext2D } from "canvas";
import { Level, ObjectType } from "../../types/level.type";
import { drawCircle, drawText, drawImageOutline } from "./drawPrimatives";

export async function drawQuestItems(
  ctx: NodeCanvasRenderingContext2D,
  levelData: Level,
  scale: number
) {
  // this part adds the special objects (doors, waypoints etc)
  levelData.objects.forEach((mapObject) => {
    let x = mapObject.x * scale + scale - 1.5;
    let y = mapObject.y * scale + scale + 0.4;
    //quest items adding a green circle
    switch (mapObject.name) {
      case "orifice": // act 2 orifice
        drawText(ctx, x - 5, y + 5, 14, "Orifice", "#FFFFFF");
        drawCircle(ctx, x, y - 10, 20, "#00FF00");
        break;
      case "gidbinn altar":
        if (levelData.id != 75) {
          drawText(ctx, x - 5, y + 5, 14, "Gidbinn Altar", "#FFFFFF");
          drawCircle(ctx, x, y, 20, "#00FF00");
        }
        break;
      case "Hellforge": // act 4 hellforge
        drawText(ctx, x + 5, y - 5, 14, "Hellforge", "#FFFFFF");
        drawCircle(ctx, x + 10, y - 10, 20, "#00FF00");
        break;
      case "cagedwussie1": // prisoners act 5
        drawText(ctx, x, y, 14, "Caged Barbs", "#FFFFFF");
        drawImageOutline(
          ctx,
          x + 75,
          y + 63,
          "./build/static/barbprison.png",
          44,
          30,
          "#00FF00"
        );
        break;
    }

    if (mapObject.name == "Tome") {
      // arcane summoner
      drawImageOutline(
        ctx,
        x - 60,
        y - 25,
        "./build/static/pedastal.png",
        40,
        60,
        "#00FF00"
      );
    }

    if (mapObject.name == "LamTome") {
      // lam essens tome
      drawImageOutline(
        ctx,
        x - 60,
        y - 25,
        "./build/static/pedastal.png",
        20,
        30,
        "#00FF00"
      );
    }

    if (mapObject.name == "Inifuss") {
      // tree
      drawImageOutline(
        ctx,
        x - 25,
        y + 23,
        "./build/static/inifusstree.png",
        30,
        50,
        "#00FF00"
      );
      //drawImage(ctx, x, y-15, "./build/static/inifusstree.png", scale * 20, scale * 30);
    }

    if (mapObject.name == "taintedsunaltar") {
      // claw viper temple 2 altar
      drawImageOutline(
        ctx,
        x - 10,
        y + 10,
        "./build/static/clawviperaltar.png",
        40,
        40,
        "#00FF00"
      );
    }

    if (mapObject.name == "Seal") {
      // chaos sanctuary seal
      drawImageOutline(
        ctx,
        x - 5,
        y + 15,
        "./build/static/seal.png",
        30,
        30,
        "#00FF00"
      );
    } 

    // anya
    if (mapObject.type == ObjectType.NPC) {
      if (
        levelData.name == "Cellar of Pity" ||
        levelData.name == "Frozen River"
      ) {
        drawText(ctx, x, y, 14, "Anya", "#FFFFFF");
        drawCircle(ctx, x+10, y - 10, 20, "#00FF00");
      }
    }
  });

  levelData.objects.map((mapObject) => {
    let x = mapObject.x * scale;
    let y = mapObject.y * scale;
    // drawn stones
    switch (mapObject.name) {
      case "StoneTheta":
      case "StoneBeta":
      case "StoneAlpha":
      case "StoneLambda":
        drawImageOutline(
          ctx,
          x - 50,
          y - 10,
          "./build/static/stone.png",
          scale * 3.5,
          scale * 15,
          "#00FF00"
        );
        break;
    }
  });

  levelData.objects.map((mapObject) => {
    let x = mapObject.x * scale;
    let y = mapObject.y * scale;
    // drawn stones
    switch (mapObject.name) {
      case "StoneGamma":
      case "StoneDelta":
        drawImageOutline(
          ctx,
          x - 50,
          y - 10,
          "./build/static/stone.png",
          scale * 3.5,
          scale * 15,
          "#00FF00"
        );
        break;
    }
  });
}
