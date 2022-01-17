import { generatePNG } from "./generatePNG";
import { makeIsometric } from "./makeIsometric";
import { getOutdoorConnectedMapIds, stitchOutdoorMaps } from "./outdoor";
import { getAllMapData, getMapData } from "../data/getMapData";
import trim from 'trim-canvas';
import { RequestConfig } from "../types/RequestConfig";
import { LevelImage } from "../types/LevelImage";

export async function generateMapImage(reqConfig: RequestConfig): Promise<any> {
    
    let levelImage = new LevelImage();
    levelImage.padding = reqConfig.padding;
    
    const connectedMaps = await getOutdoorConnectedMapIds(reqConfig.mapid);
    if (connectedMaps.length > 0) {
      // if outdoors then force downloading of all seed data
      levelImage.seedData = await getAllMapData(reqConfig.seed, reqConfig.difficulty, 0);
      levelImage.mapData = levelImage.seedData.levels.find((map) => map.id === (reqConfig.mapid));
      levelImage = await stitchOutdoorMaps(levelImage, reqConfig, connectedMaps);
    } else {
      levelImage.mapData = await getMapData(reqConfig.seed, reqConfig.difficulty, reqConfig.mapid);
      levelImage = await generatePNG(levelImage, reqConfig);  
    }
    if (reqConfig.isometric) {
        levelImage = await makeIsometric(levelImage)
    }
    
    if (reqConfig.trim) {
      let leftBeforeTrim = levelImage.canvas.width;
      let topBeforeTrim = levelImage.canvas.height;
      levelImage.canvas = await trim(levelImage.canvas, levelImage.padding)
      levelImage.leftTrimmed = leftBeforeTrim - levelImage.canvas.width;
      levelImage.topTrimmed = topBeforeTrim - levelImage.canvas.height;
    }
    return levelImage;
}