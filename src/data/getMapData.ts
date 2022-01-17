import { Level, LevelList } from "../types/level.type";
import * as fs from "fs";
import * as path from "path";
import { getFromWine } from "./getFromWine";
import { performance } from "perf_hooks";
import { getFromWindowsExe } from "./getFromWindowsExe";

export async function getMapData(
  seed: string,
  difficulty: string,
  mapid: number
): Promise<Level> {
  const seedData: LevelList = await getAllMapData(seed, difficulty, mapid);
  return seedData.levels.find((map) => map.id === mapid);
}

export async function getAllMapData(
  seed: string,
  difficulty: string,
  mapid: number
): Promise<LevelList> {
  const start = performance.now();
  let cachedFile = `./cache/${seed}_${difficulty}.json`;
  // fetch the data from the web and save to ./build/data folder
  let seedData: LevelList;
  if (fs.existsSync(cachedFile)) {
    // if it was previously saved, use the same file
    seedData = await getAllMapsFromCache(cachedFile);
    const end = performance.now();
    console.log(
      `Read cached file ${path.resolve(cachedFile)}, took ${Math.trunc(
        end - start
      )}ms`
    );
  } else {
    if (mapid != 0) {
      // load all data asynchrously
      // but wait for individual map
      seedData = await getSingleMapFromWine(seed, difficulty, mapid);
      getAllMapsFromWineOnce(seed, difficulty, cachedFile);
      const end = performance.now();
      console.log(
        `Generated single map data ${seed} ${difficulty}, took ${Math.trunc(
          end - start
        )}ms`
      );
    } else {
      seedData = await getAllMapsFromWine(seed, difficulty, cachedFile);
      const end = performance.now();
      console.log(
        `Generated full map data for outdoors ${seed} ${difficulty}, took ${Math.trunc(
          end - start
        )}ms`
      );
    }
  }
  return seedData;
}

function saveFile(fileName: string, data: string) {
  if (!fs.existsSync(path.dirname(fileName)))
    fs.mkdirSync(path.dirname(fileName), { recursive: true });
  fs.writeFileSync(fileName, data);
  console.log(`Saved JSON ${fileName}`);
}

async function getSingleMapFromWine(
  seed: string,
  difficulty: string,
  mapid: number
): Promise<LevelList> {
  console.log("Getting single map " + mapid);
  let mapsData: Level[]
  if (process.env.WINEARCH) {
    mapsData = await getFromWine(seed, difficulty, mapid);
  } else {
    mapsData = await getFromWindowsExe(seed, difficulty, mapid);
  }
  if (mapsData.length == 0) {
    throw new Error("Failed generating data, no level data found");
  }
  const seedData: LevelList = {
    seed: seed,
    difficulty: difficulty,
    levels: mapsData,
  };
  return seedData;
}

async function getAllMapsFromWineOnce(
  seed: string,
  difficulty: string,
  cachedFile: string
): Promise<void> {
  let skipGeneration: boolean = await isInQueue(cachedFile);
  if (!skipGeneration) {
    // dont execute if there's an existing request
    getAllMapsFromWine(seed, difficulty, cachedFile);
  }
}

async function getAllMapsFromWine(
  seed: string,
  difficulty: string,
  cachedFile: string
): Promise<LevelList> {
  let mapsData: Level[];
  if (process.env.WINEARCH) {
    mapsData = await getFromWine(seed, difficulty);
  } else {
    mapsData = await getFromWindowsExe(seed, difficulty);
  }
  if (mapsData.length == 0) {
    throw new Error("Failed generating data, no level data found");
  }
  const seedData: LevelList = {
    seed: seed,
    difficulty: difficulty,
    levels: mapsData,
  };
  saveFile(cachedFile, JSON.stringify(seedData));
  return seedData;
}

async function isInQueue(cachedFile: string): Promise<boolean> {
  const generationQueue = path.resolve("./cache/queue.txt");
  let skipGeneration: boolean = false;
  if (fs.existsSync(generationQueue)) {
    const queue = fs.readFileSync(generationQueue, { encoding: "utf8" });
    if (queue.includes(cachedFile)) {
      console.log("Skipping generating data for " + cachedFile);
      skipGeneration = true; // this prevents the map data being generated a second time
    } else {
      fs.appendFileSync(generationQueue, cachedFile + "\n");
      skipGeneration = false;
    }
  } else {
    fs.appendFileSync(generationQueue, cachedFile + "\n");
    skipGeneration = false;
  }
  return skipGeneration;
}

async function getAllMapsFromCache(cachedFile: string): Promise<LevelList> {
  // if it was previously saved, use the same file
  console.log("Reading cache file " + cachedFile);
  const seedData: LevelList = JSON.parse(
    fs.readFileSync(path.resolve(cachedFile), { encoding: "utf8" })
  );
  if (seedData?.levels?.length == 0) {
    console.error(
      "Error found with cached file, deleting file, please try again"
    );
    fs.unlinkSync(cachedFile);
  }
  return seedData;
}
