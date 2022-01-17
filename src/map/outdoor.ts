import { Canvas, createCanvas, NodeCanvasRenderingContext2D } from "canvas";
import { Level } from "../types/level.type";
import { LevelImage } from "../types/LevelImage";
import { RequestConfig } from "../types/RequestConfig";
import { drawStraightText } from "./drawing/drawPrimatives";
import { generatePNG } from "./generatePNG";

export async function getOutdoorConnectedMapIds(
  mapid: number
): Promise<number[]> {
  switch (mapid) {
    // act 1
    case 2: return [1,3];
    case 3: return [2,4, 17];
    case 4: return [3];
    case 5: return [6];
    case 6: return [5,7];
    case 7: return [6,26];
    case 17: return [2];
    case 26: return [7,27];
    case 27: return [26,28];
    case 28: return [27];
    case 32: return [33];
    case 33: return [32];

    // act 2
    case 41: return [40,42];
    case 42: return [41,43];
    case 43: return [42,44];
    case 44: return [43,45];
    case 45: return [44];

    // act 3
    case 76: return [75,77,78];
    case 77: return [76,78];
    case 78: return [76,77,79];
    case 79: return [78,80];
    case 80: return [79,81];
    case 81: return [80,82];
    case 82: return [81,83];
    case 83: return [82];

    //act 4
    case 104: return [103,105];
    case 105: return [104,106];
    case 106: return [105];
    case 107: return [108];
    case 108: return [107];

    //act 5
    case 110: return [109,111];
    case 111: return [110,112];
    case 112: return [111];
  }
  return [];
}

export async function stitchOutdoorMaps(
  levelImage: LevelImage,
  reqConfig: RequestConfig,
  secondaryMapIds: number[]
): Promise<LevelImage> {
  const primaryMapData: Level = levelImage.mapData;
  const primaryMap: LevelImage = await generatePNG(levelImage, reqConfig);
  const scale = reqConfig.serverScale

  const canvas = createCanvas(
    primaryMap.canvas.width,
    primaryMap.canvas.height
  );
  const outdoorctx = canvas.getContext("2d");
  
  const padding = reqConfig.padding;
  for (let i = 0; i < secondaryMapIds.length; i++) {
    
    const mapData: Level = levelImage.seedData.levels.find(
      (map) => map.id === (secondaryMapIds[i])
    );
    reqConfig.watermark = false;
    reqConfig.wallColor = "#999";
    reqConfig.showTextLabels = false;
    reqConfig.showLevelTitles = true;

    let thisLevelImage = new LevelImage();
    thisLevelImage.mapData = mapData;
    const thisMapImage: LevelImage = await generatePNG(thisLevelImage, reqConfig);
    const topX = (thisMapImage.mapData.offset.x - primaryMap.mapData.offset.x) * scale;
    const topY = (thisMapImage.mapData.offset.y - primaryMap.mapData.offset.y) * scale;
    outdoorctx.drawImage(thisMapImage.canvas, topX, topY);
    const fontSize = 20;
    const indent = 20;
    if (topX == (primaryMapData.size.width * scale)) {
      // console.log(`${mapData.name} is right of ${primaryMapData.name}`);
      const textX = topX + padding + indent;
      let textY = topY + mapData.size.height + padding;
      textY = minmaxY(textY, canvas);
      drawStraightText(outdoorctx, textX, textY, fontSize, mapData.name, "#888", 270);
    } else if (topX == -(mapData.size.width * scale)) {
      // console.log(`${mapData.name} is left of ${primaryMapData.name}`);
      const textX = topX + (mapData.size.width * scale) + padding - indent;
      let textY = topY + mapData.size.height + padding;
      textY = minmaxY(textY, canvas);
      drawStraightText(outdoorctx, textX, textY, fontSize, mapData.name, "#888", 270);
    } else if (topY == -(mapData.size.height * scale)) {
      // console.log(`${mapData.name} is above ${primaryMapData.name}`);
      let textX = topX + mapData.size.width + padding;
      const textY = topY + (mapData.size.height * scale) + padding - indent;
      textX = minmaxX(textX, canvas);
      drawStraightText(outdoorctx, textX, textY, fontSize, mapData.name, "#888", 0);
    } else if (topY == (primaryMapData.size.height * scale)) {
      // console.log(`${mapData.name} is below ${primaryMapData.name}`);
      let textX = topX + primaryMapData.size.width + padding;
      const textY = topY + padding + indent;
      textX = minmaxX(textX, canvas);
      drawStraightText(outdoorctx, textX, textY, fontSize, mapData.name, "#888", 0);
    }
  }
  outdoorctx.drawImage(primaryMap.canvas, 0, 0);

  outdoorctx.globalCompositeOperation = "destination-out";
  
  // add some fading to the edges
  edgeGradientTop(outdoorctx, primaryMap.canvas);
  edgeGradientBottom(outdoorctx, primaryMap.canvas);
  edgeGradientLeft(outdoorctx, primaryMap.canvas);
  edgeGradientRight(outdoorctx, primaryMap.canvas);
  primaryMap.canvas = canvas;
  return primaryMap;
}

function edgeGradientBottom(outdoorctx: NodeCanvasRenderingContext2D, canvas: Canvas) {
  const gradient = outdoorctx.createLinearGradient(0, canvas.height-100, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
  outdoorctx.fillStyle = gradient;
  outdoorctx.fillRect(0, canvas.height-100, canvas.width, canvas.height);
}

function edgeGradientTop(outdoorctx: NodeCanvasRenderingContext2D, canvas: Canvas) {
  const gradient = outdoorctx.createLinearGradient(0, 0, 0, 100);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  outdoorctx.fillStyle = gradient;
  outdoorctx.fillRect(0, 0, canvas.width, 100);
}

function edgeGradientLeft(outdoorctx: NodeCanvasRenderingContext2D, canvas: Canvas) {
  const gradient = outdoorctx.createLinearGradient(0, 0, 100, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  outdoorctx.fillStyle = gradient;
  outdoorctx.fillRect(0, 0, 100, canvas.height);
}

function edgeGradientRight(outdoorctx: NodeCanvasRenderingContext2D, canvas: Canvas) {
  const gradient = outdoorctx.createLinearGradient(canvas.width-100, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
  outdoorctx.fillStyle = gradient;
  outdoorctx.fillRect(canvas.width-100, 0, 100, canvas.height);
}


function minmaxY(textY, canvas: Canvas) {
  const maxY = (canvas.height - 150);
  const minY = 150;
  if (textY > maxY) {
    return maxY;
  } else if (textY < minY) {
    return minY;
  } else {
    return textY;
  }
}

function minmaxX(textX, canvas: Canvas) {
  const maxX = (canvas.width - 150);
  const minX = 150;
  if (textX > maxX) {
    return maxX;
  } else if (textX < minX) {
    return minX;
  } else {
    return textX;
  }
}