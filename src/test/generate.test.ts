// const { getMapData } = require("../wine/getMapData");
import { Canvas } from "canvas";
import { generateMapImage } from "../map/generateMapImage";
import { LevelImage } from "../types/LevelImage";
import { RequestConfig } from "../types/RequestConfig";

describe("All maps can generate without error", () => {
  console.log = jest.fn();
  for (let i = 1; i < 126; i++) {
    test("Successfully generate map " + i, async () => {
      const seed = "1034522";
      const difficulty = "2";
      const mapid = i;

      const reqConfig = new RequestConfig(
        seed,
        difficulty,
        mapid,
        false, //verbose
        true, //trim
        true, //isometric
        true, //edge
        0.8,
        2
      );

      const levelImage: LevelImage = await generateMapImage(reqConfig);
      expect(levelImage.mapData.id).toEqual(i);
      expect(levelImage.canvas instanceof Canvas).toBe(true);
    });
  }
});
