import * as fs from "fs";
import { generateMapImage } from "../map/generateMapImage";
import { LevelImage } from "../types/LevelImage";
import { RequestConfig } from "../types/RequestConfig";

// this is very lazy, sue me
async function test() {
  const seed = "1034522"
  createImage(seed, "2", 1, "Rogue Encampment");
  createImage(seed, "2", 2, "Blood Moor");
  createImage(seed, "2", 3, "Cold Plains");
  createImage(seed, "2", 4, "Stony Field");
  createImage(seed, "2", 5, "Dark Wood");
  createImage(seed, "2", 6, "Black Marsh");
  createImage(seed, "2", 7, "Tamoe Highland");
  createImage(seed, "2", 8, "Den of Evil");
  createImage(seed, "2", 9, "Cave Level 1");
  createImage(seed, "2", 10, "Underground Passage Level 1");
  createImage(seed, "2", 11, "Hole Level 1");
  createImage(seed, "2", 12, "Pit Level 1");
  createImage(seed, "2", 13, "Cave Level 2");
  createImage(seed, "2", 14, "Underground Passage Level 2");
  createImage(seed, "2", 15, "Hole Level 2");
  createImage(seed, "2", 16, "Pit Level 2");
  createImage(seed, "2", 17, "Burial Grounds");
  createImage(seed, "2", 18, "Crypt");
  createImage(seed, "2", 19, "Mausoleum");
  createImage(seed, "2", 20, "Forgotten Tower");
  createImage(seed, "2", 21, "Tower Cellar Level 1");
  createImage(seed, "2", 22, "Tower Cellar Level 2");
  createImage(seed, "2", 23, "Tower Cellar Level 3");
  createImage(seed, "2", 24, "Tower Cellar Level 4");
  createImage(seed, "2", 25, "Tower Cellar Level 5");
  createImage(seed, "2", 26, "Monastery Gate");
  createImage(seed, "2", 27, "Outer Cloister");
  createImage(seed, "2", 28, "Barracks");
  createImage(seed, "2", 29, "Jail Level 1");
  createImage(seed, "2", 30, "Jail Level 2");
  createImage(seed, "2", 31, "Jail Level 3");
  createImage(seed, "2", 32, "Inner Cloister");
  createImage(seed, "2", 33, "Cathedral");
  createImage(seed, "2", 34, "Catacombs Level 1");
  createImage(seed, "2", 35, "Catacombs Level 2");
  createImage(seed, "2", 36, "Catacombs Level 3");
  createImage(seed, "2", 37, "Catacombs Level 4");
  createImage(seed, "2", 38, "Tristram");
  createImage(seed, "2", 39, "Moo Moo Farm");
  createImage(seed, "2", 40, "Lut Gholein");
  createImage(seed, "2", 41, "Rocky Waste");
  createImage(seed, "2", 42, "Dry Hills");
  createImage(seed, "2", 43, "Far Oasis");
  createImage(seed, "2", 44, "Lost City");
  createImage(seed, "2", 45, "Valley of Snakes");
  createImage(seed, "2", 46, "Canyon of the Magi");
  createImage(seed, "2", 47, "Sewers Level 1");
  createImage(seed, "2", 48, "Sewers Level 2");
  createImage(seed, "2", 49, "Sewers Level 3");
  createImage(seed, "2", 50, "Harem Level 1");
  createImage(seed, "2", 51, "Harem Level 2");
  createImage(seed, "2", 52, "Palace Cellar Level 1");
  createImage(seed, "2", 53, "Palace Cellar Level 2");
  createImage(seed, "2", 54, "Palace Cellar Level 3");
  createImage(seed, "2", 55, "Stony Tomb Level 1");
  createImage(seed, "2", 56, "Halls of the Dead Level 1");
  createImage(seed, "2", 57, "Halls of the Dead Level 2");
  createImage(seed, "2", 58, "Claw Viper Temple Level 1");
  createImage(seed, "2", 59, "Stony Tomb Level 2");
  createImage(seed, "2", 60, "Halls of the Dead Level 3");
  createImage(seed, "2", 61, "Claw Viper Temple Level 2");
  createImage(seed, "2", 62, "Maggot Lair Level 1");
  createImage(seed, "2", 63, "Maggot Lair Level 2");
  createImage(seed, "2", 64, "Maggot Lair Level 3");
  createImage(seed, "2", 65, "Ancient Tunnels");
  createImage(seed, "2", 66, "Tal Rasha's Tomb");
  createImage(seed, "2", 67, "Tal Rasha's Tomb");
  createImage(seed, "2", 68, "Tal Rasha's Tomb");
  createImage(seed, "2", 69, "Tal Rasha's Tomb");
  createImage(seed, "2", 70, "Tal Rasha's Tomb");
  createImage(seed, "2", 71, "Tal Rasha's Tomb");
  createImage(seed, "2", 72, "Tal Rasha's Tomb");
  createImage(seed, "2", 73, "Duriel's Lair");
  createImage(seed, "2", 74, "Arcane Sanctuary");
  createImage(seed, "2", 75, "Kurast Docktown");
  createImage(seed, "2", 76, "Spider Forest");
  createImage(seed, "2", 77, "Great Marsh");
  createImage(seed, "2", 78, "Flayer Jungle");
  createImage(seed, "2", 79, "Lower Kurast");
  createImage(seed, "2", 80, "Kurast Bazaar");
  createImage(seed, "2", 81, "Upper Kurast");
  createImage(seed, "2", 82, "Kurast Causeway");
  createImage(seed, "2", 83, "Travincal");
  createImage(seed, "2", 84, "Spider Cave");
  createImage(seed, "2", 85, "Spider Cavern");
  createImage(seed, "2", 86, "Swampy Pit Level 1");
  createImage(seed, "2", 87, "Swampy Pit Level 2");
  createImage(seed, "2", 88, "Flayer Dungeon Level 1");
  createImage(seed, "2", 89, "Flayer Dungeon Level 2");
  createImage(seed, "2", 90, "Swampy Pit Level 3");
  createImage(seed, "2", 91, "Flayer Dungeon Level 3");
  createImage(seed, "2", 92, "Sewers Level 1");
  createImage(seed, "2", 93, "Sewers Level 2");
  createImage(seed, "2", 94, "Ruined Temple");
  createImage(seed, "2", 95, "Disused Fane");
  createImage(seed, "2", 96, "Forgotten Reliquary");
  createImage(seed, "2", 97, "Forgotten Temple");
  createImage(seed, "2", 98, "Ruined Fane");
  createImage(seed, "2", 99, "Disused Reliquary");
  createImage(seed, "2", 100, "Durance of Hate Level 1");
  createImage(seed, "2", 101, "Durance of Hate Level 2");
  createImage(seed, "2", 102, "Durance of Hate Level 3");
  createImage(seed, "2", 103, "The Pandemonium Fortress");
  createImage(seed, "2", 104, "Outer Steppes");
  createImage(seed, "2", 105, "Plains of Despair");
  createImage(seed, "2", 106, "City of the Damned");
  createImage(seed, "2", 107, "River of Flame");
  createImage(seed, "2", 108, "Chaos Sanctum");
  createImage(seed, "2", 109, "Harrogath");
  createImage(seed, "2", 110, "Bloody Foothills");
  createImage(seed, "2", 111, "Rigid Highlands");
  createImage(seed, "2", 112, "Arreat Plateau");
  createImage(seed, "2", 113, "Crystalized Cavern Level 1");
  createImage(seed, "2", 114, "Cellar of Pity");
  createImage(seed, "2", 115, "Crystalized Cavern Level 2");
  createImage(seed, "2", 116, "Echo Chamber");
  createImage(seed, "2", 117, "Tundra Wastelands");
  createImage(seed, "2", 118, "Glacial Caves Level 1");
  createImage(seed, "2", 119, "Glacial Caves Level 2");
  createImage(seed, "2", 120, "Rocky Summit");
  createImage(seed, "2", 121, "Nihlathaks Temple");
  createImage(seed, "2", 122, "Halls of Anguish");
  createImage(seed, "2", 123, "Halls of Death's Calling");
  createImage(seed, "2", 124, "Halls of Vaught");
  createImage(seed, "2", 125, "Hell1");
  createImage(seed, "2", 126, "Hell2");
  createImage(seed, "2", 127, "Hell3");
  createImage(seed, "2", 128, "The Worldstone Keep Level 1");
  createImage(seed, "2", 129, "The Worldstone Keep Level 2");
  createImage(seed, "2", 130, "The Worldstone Keep Level 3");
  createImage(seed, "2", 131, "Throne of Destruction");
  createImage(seed, "2", 132, "The Worldstone Chamber");
  // createImage("65464564", "2", "124", "vaught-topleft");
  // createImage("35481586", "2", "124", "vaught-topright");
  // createImage("33333", "2", "124", "vaught-bottomleft");
  // createImage("543523", "2", "124", "vaught-bottomright");
}

async function createImage(
  seed: string,
  difficulty: string,
  mapid: number,
  filename: string
) {
  console.log(`Getting ${seed} ${difficulty} ${mapid}`);

  const reqConfig = new RequestConfig(
    seed,
    difficulty,
    mapid,
    false, //verbose
    false, //trim
    false, //isometric
    true, //edge
    0.8,
    2,
    150
  );

  let levelImage: LevelImage = await generateMapImage(reqConfig);
  fs.writeFileSync(
    "./build/" + reqConfig.mapid + "-" + filename + ".png",
    levelImage.canvas.toBuffer("image/png")
  );
}

test();
