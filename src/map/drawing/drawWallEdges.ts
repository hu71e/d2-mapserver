import { NodeCanvasRenderingContext2D } from "canvas";
import { RequestConfig } from "../../types/RequestConfig";
import { Level } from "../../types/level.type";

export async function drawWallEdges(ctx: NodeCanvasRenderingContext2D, levelData: Level, scale: number, reqConfig: RequestConfig) {
  
  const imgWidth = ctx.canvas.width
  const imgHeight = ctx.canvas.height

  let rows = new Array();
  const fullWidth = levelData.size.width;
  levelData.map.forEach((coord, index) => {
    let fill = false;
    let x = 1;
    let thisRow = new Array(imgWidth).fill(0);
    const lastCoord = coord.length -1;
    coord.forEach((plotx, idx) => {
      // only the first (every odd) number is used
      // the second value is void space and not necessary
      let width = plotx * 1;
      fill = !fill;
      if (!fill) {
        for (var i = x; i < (x+width); i++) {
          thisRow[i] = 1;
        }
      }
      x = x + width;
      if ((idx == lastCoord) && fill) {
        const extrax = fullWidth - x;
        for (var i = x; i < (x+extrax); i++) {
          thisRow[i] = 1;
        }
      }
    });
    rows.push(thisRow);
  });

  // add in a final row of empty space to make sure wall is created
  // let rowLength = rows[0].length;
  rows.push(new Array(imgWidth).fill(0));
  rows.unshift(new Array(imgWidth).fill(0));

  // fs.writeFileSync('level2.txt', "");
  let edgeRows = new Array();
  for (let irow = 0; irow <= rows.length -1; irow++) {
    let edgeRow = new Array(imgWidth).fill(0);
    for (let icol =0; icol < imgHeight*2 ; icol++) {
      // above row
      let thisPixel = rows[irow][icol];
      if (thisPixel == 0) {
        
        let borders = checkSurroungPixels(rows, irow, icol, imgWidth, rows.length-1)
        if (borders) {
          edgeRow[icol] = 1;
        }
      }
    }
    // fs.appendFileSync('level2.txt', edgeRow.toString());
    // fs.appendFileSync('level2.txt', "\r\n");
    edgeRows.push(edgeRow);
  }

  const wallthickness = reqConfig.wallthickness
  let y = 0;
  edgeRows.forEach(edgeRow => {
    let x = 0;
    edgeRow.forEach(pixl => {
      if (pixl == 1) {
        
        ctx.beginPath();
        ctx.fillStyle = reqConfig.wallColor;
        ctx.fillRect(x, y, scale*wallthickness, scale*wallthickness);
        ctx.stroke();
      }
      x = x + scale;
    });
    y = y + scale;
  });
}

function checkSurroungPixels(rows, irow, icol, imgWidth, imgHeight) : boolean {

  // above row
  if (irow > 0) {
    if (icol > 0) {
      if (rows[irow - 1][icol - 1] == 1) return true;
    }
    if (rows[irow - 1][icol] == 1) return true;
    if (icol < imgWidth) {
      if (rows[irow - 1][icol + 1] == 1) return true;
    }
  }

  // same row
  if (icol > 0) {
    if (rows[irow][icol - 1] == 1) return true;
  }
  if (icol < imgWidth) {
    if (rows[irow][icol + 1] == 1) return true;
  }
  if (irow < imgHeight) {
    if (icol > 0) {
      if (rows[irow + 1][icol - 1] == 1) return true;
    }
    if (rows[irow + 1][icol] == 1) return true;
    if (icol < imgWidth) {
      if (rows[irow + 1][icol + 1] == 1) return true;
    }
  }
  return false;
}