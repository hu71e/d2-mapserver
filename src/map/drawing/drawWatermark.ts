import { Canvas, createCanvas, NodeCanvasRenderingContext2D } from "canvas";
import { RequestConfig } from "../../types/RequestConfig";

export function drawWatermark(ctx: NodeCanvasRenderingContext2D, reqConfig: RequestConfig): Canvas {
  
    let watermarks = [];
    watermarks.push("If you paid for this you \nhave been scammed\nSearch d2r-mapview on Github");
    watermarks.push("Slow server?\nYou can run your own for free");
    watermarks.push("Advanced MMO is a scammer!\nSearch d2r-mapview on Github");
    watermarks.push("如果您为此付款，您就被骗了。\n在 Github 上搜索 d2r-mapview");
    watermarks.push("\n收费行为均为诈骗");

    let watermarkText = watermarks[Math.floor(Math.random()*watermarks.length)];
    if (!reqConfig.watermark) watermarkText = "";
    
    const canvas2: Canvas = createCanvas(ctx.canvas.width, ctx.canvas.height+20);
    const ctx2: NodeCanvasRenderingContext2D = canvas2.getContext("2d");
    ctx2.drawImage(ctx.canvas, 0,0);
    ctx2.save();
    
    ctx2.font = `400 12px`;
    ctx2.textAlign = "center";
    ctx2.textBaseline = "top";
    ctx2.strokeStyle = "black";
    ctx2.lineWidth = 1;
    if (Math.random() < 0.8) {
      // text on top
      ctx2.translate(110, 70);
    } else {
      // text on bottom
      ctx2.translate(canvas2.width-140, canvas2.height-140);
    }
    ctx2.rotate((-45 * Math.PI) / 180);
    ctx2.scale(1, 2);
    ctx2.strokeText(watermarkText, 0, 0);
    ctx2.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx2.fillText(watermarkText, 0, 0);
    ctx2.restore();
    return canvas2;
  }

 