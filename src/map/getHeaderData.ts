import { Level, ObjectType } from "../types/level.type";

export function getHeaderData(levelData: Level, mapRefList) {
    return {
        exitLocations: getExitHeaderData(levelData, mapRefList),
        waypointLocation: getWaypointHeaderData(levelData),
        bossLocations: getBossHeaderData(levelData),
        questLocations: getQuestHeaderdata(levelData),
    }
}

function getExitHeaderData(levelData: Level, mapRefList): string {
    const exits = levelData.objects.filter(obj => obj.type == ObjectType.Exit);
    let exitArr = [];
    exits.forEach(exit => {
        const mapName = mapRefList.find(ref => exit.id == ref.id)?.name;
        exitArr.push(`${exit.id},${mapName},${exit.x},${exit.y}`);
    });
    if (exitArr.length) return exitArr.join('|')
    return "";
}

function getWaypointHeaderData(levelData: Level): string {
    const waypoint = levelData.objects.filter(obj => obj.name == "Waypoint");
    if (waypoint.length) return `${waypoint[0].x},${waypoint[0].y}`;
    return "";
} 


function getBossHeaderData(levelData: Level): string {
    let bossHeaders = [];
    levelData.objects.forEach((mapObject) => {
        let x = mapObject.x;
        let y = mapObject.y;

        if (levelData.name == "Arcane Sanctuary") {
            if (mapObject.id == 250) {
                bossHeaders.push(`Summoner,${x},${y}`);
            }
        }

        if (mapObject.type === ObjectType.NPC) {
            switch (levelData.name) {
                case "Plains of Despair": // izual
                    bossHeaders.push(`Izual,${x},${y}`);
                    break;
                case "Maggot Lair Level 3": // maggot boss
                    bossHeaders.push( `Maggot Boss,${x},${y}`);
                    break;
                case "Sewers Level 3":   // radament
                    if (mapObject.id == 744) {
                        bossHeaders.push(`Radament,${x},${y}`);
                    }
                    break;
                case "Halls of Vaught": // nihlithak
                    // there is only one NPC in halls of vaught
                    // nihlithak appears in the oppositie side to that NPC
                    if (x == 30  && y == 208) { x = 392; y = 201; } 
                    if (x == 206 && y == 32) { x = 207; y = 386; } 
                    if (x == 207 && y == 393) { x = 207; y = 16; } 
                    if (x == 388 && y == 216) { x = 22; y = 201; } 
                    bossHeaders.push(`Nihlathak,${x},${y}`);
                    break;
            }
        }
    });
    return bossHeaders.join('|');
}

function getQuestHeaderdata(levelData: Level): string {
  let questData = [];
  // this part adds the special objects (doors, waypoints etc)
  levelData.objects.forEach((mapObject) => {
    let x = mapObject.x;
    let y = mapObject.y;
    //quest items adding a green circle
    switch (mapObject.name) {
      case "orifice": // act 2 orifice
        questData.push(`Orifice,${x},${y}`);
        break;
      case "gidbinn altar":
        if (levelData.id != 75) {
          questData.push(`Gidbinn,${x},${y}`);
        }
        break;
      case "Hellforge": // act 4 hellforge
        questData.push(`Hellforge,${x},${y}`);
        break;
      case "cagedwussie1": // prisoners act 5
        questData.push(`Prisoners,${x},${y}`);
        break;
    }

    if (mapObject.name == "Inifuss") {
      // tree
      questData.push(`Inifuss,${x},${y}`);
    }

    if (mapObject.name == "StoneGamma") {
      questData.push(`Stones,${x-25},${y-15}`);
    }

    // anya
    if (mapObject.type == ObjectType.NPC) {
      if (
        levelData.name == "Cellar of Pity" ||
        levelData.name == "Frozen River"
      ) {
        questData.push(`Anya,${x},${y}`);
      }
    }
  });

  return questData.join("|");
}