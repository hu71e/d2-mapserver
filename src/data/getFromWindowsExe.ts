import { Level } from "../types/level.type";
import * as fs from "fs";
import { spawn } from "child_process";
import { performance } from "perf_hooks";

export async function getFromWindowsExe(
  seed: string,
  difficulty: string,
  mapId: number = 0
): Promise<Level[]> {
  const start = performance.now();
  const cmd = [
    "game",
    "--seed",
    seed,
    "--difficulty",
    difficulty,
  ];
  if (mapId > 0) {
    cmd.push("--map");
    cmd.push(mapId.toString());
  }
  console.log("Spawning process: " + cmd.join(" ").toString());
  let scriptOutput = "";
  const errorFile = "./cache/windowserrors.log";
  let mapLines: Level[] = [];

  return new Promise((resolve) => {
    let errorStream = fs.createWriteStream(errorFile, { flags: "a" });
    var child = spawn("bin/d2-map.exe", cmd);
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", function (data) {
      data = data.toString();
      scriptOutput += data;
      if (data.includes("Map:Generation:Done")) {
        const end = performance.now();
        console.log(
          `Windows exe done generation ${seed} ${difficulty} ${mapId}, took ${Math.trunc(
            end - start
          )}ms`
        );
        processStdOut(scriptOutput).then((mapLines) => {
          return resolve(mapLines);
        });
      }
    });
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (data) => {
      console.error("Error detected running Windows exe: " + data);
      errorStream.write(data.toString());
    });

    child.on("close", function (code) {
      child.kill(9);
      return resolve(mapLines);
    });
  });
}

async function processStdOut(scriptOutput: string): Promise<Level[]> {
  let mapLines: Level[] = [];
  try {
    scriptOutput.split(/\n/).forEach((line) => {
      if (!line.includes("time") && line.length > 4) {
        try {
          let thisMap: Level = JSON.parse(line);
          mapLines.push(thisMap);
        } catch (err) {
          console.error(line);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
  return mapLines;
}
