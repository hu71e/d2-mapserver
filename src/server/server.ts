import { execSync } from "child_process";
import * as express from "express";
import { param } from "express-validator";
import * as fs from 'fs';
import * as path from 'path';

import { mapData, mapImage, prefetch } from "./routes";

const uest = require('uest')
const { registerFont } = require('canvas')
var morgan = require('morgan')
const moment = require('moment-timezone').tz(process.env.TZ)

require( "console-stamp" )( console, {
  formatter: function(){
      return moment().format("LLLL");
  }
});

// log all errors to file
fs.writeFileSync('./cache/access.log', "");
var accessLogStream = fs.createWriteStream('./cache/access.log', { flags: 'a' })

const app = express();
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  const fontFile = path.resolve("./build/static/Roboto-Regular.ttf");
  const fontFileBold = path.resolve("./build/static/Roboto-Bold.ttf");
  const fontFileExocet = path.resolve("./build/static/exocetblizzardot-medium.otf");
  const fontFileSC = path.resolve("./build/static/NotoSansSC-Regular.otf");
  if (fs.existsSync(fontFile)) {
    
    console.log("Adding font " + fontFileExocet);
    registerFont(fontFileExocet, { family: 'ExocetBlizzardMixedCapsOTMedium', weight: 'bold' })
    registerFont(fontFileExocet, { family: 'ExocetBlizzardMixedCapsOTMedium' })
    console.log("Adding font " + fontFileSC);
    registerFont(fontFileSC, { family: 'Noto Sans Simplified Chinese', weight: 'regular' })
    console.log("Adding font " + fontFile);
    registerFont(fontFile, { family: 'Roboto' })
    console.log("Adding font " + fontFileBold);
    registerFont(fontFileBold, { family: 'Roboto', weight: 'bold' })
    
  }
  const generationQueue = './cache/queue.txt'
  if (fs.existsSync(generationQueue)) {
    fs.unlinkSync(generationQueue);
  }

  // if in docker, setup wine
  if (process.env.WINEARCH) {
    if (!fs.existsSync("/app/game/Fog.dll")) {
      console.error("Fog.dll not found in /app/game, check your game files volume path");
      process.exit();
    }
    console.log(`Updating wine registry....`);
    execSync("winecfg", { env: { WINEPREFIX: '/app/wine_d2', WINEDEBUG: '-all,fixme-all', WINEARCH: 'win32' } });
    execSync("wine regedit /app/d2.install.reg", { env: { WINEPREFIX: '/app/wine_d2', WINEDEBUG: '-all,fixme-all', WINEARCH: 'win32' } });
  }

  console.log(`Test this server by opening this link in your browser: http://localhost:${PORT}/v1/map/12345/2/117/image`);
  console.log(`For troubleshooting refer to https://github.com/joffreybesos/d2r-mapview/blob/master/SERVER.md#troubleshoot`);
  console.log(`Running on http://localhost:${PORT}`);
});

// Add headers before the routes are defined
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// log all HTTP errors
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 },
  stream: accessLogStream }));
app.use(uest())

app.get(
  "/v1/map/:seed/:difficulty/:mapid",
  param("seed").isNumeric(),
  param("difficulty").isNumeric(),
  param("mapid").isNumeric(),
  mapData
);

app.get(
  "/v1/map/:seed/:difficulty/:mapid/image",
  param("seed").isNumeric(),
  param("difficulty").isNumeric(),
  param("mapid").isNumeric(),
  mapImage
);

app.post("/v1/map/prefetch",
  param("seed").isNumeric(),
  param("difficulty").isNumeric(),
  param("mapid").isNumeric(),
  prefetch
);

app.get('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }
  res.status(200).send(data);
});