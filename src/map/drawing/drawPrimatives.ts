import { createCanvas, loadImage } from "canvas";

export function drawRectangle(ctx, x, y, width, height, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.stroke();
}

export function drawCircle(ctx, x, y, size, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y + size / 2, size / 2, 0, 2 * Math.PI);
  ctx.fill();
}

export function drawText(ctx, x, y, fontSize, mapLabel, textColor) {
  ctx.save();
  ctx.font = `900 ${fontSize}px "ExocetBlizzardMixedCapsOTMedium"`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  ctx.translate(x - 20, y - 20);
  ctx.rotate((-45 * Math.PI) / 180);
  ctx.scale(1, 2);
  ctx.strokeText(mapLabel, 0, 0);
  ctx.fillStyle = textColor;
  ctx.fillText(mapLabel, 0, 0);
  ctx.restore();
}

export function drawStraightText(ctx, x, y, fontSize, text, textColor, rotate) {
  ctx.save();
  ctx.font = `900 ${fontSize}px "ExocetBlizzardMixedCapsOTMedium"`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.translate(x, y);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.strokeText(text, 0, 0);
  ctx.fillStyle = textColor;
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

export async function drawImage(ctx, x, y, fileName, width, height) {
  ctx.save();
  const image = await loadImage(fileName);
  ctx.translate(x - image.width / 2, y - image.height / 2);
  ctx.rotate((-45 * Math.PI) / 180);
  ctx.scale(1, 1.8);
  ctx.drawImage(image, 0, 0, width, height);
  ctx.restore();
}


export async function drawImageOutline(ctx2, x, y, fileName, width, height, outlineColor) {
  const padding = 5;
  const image = await loadImage(fileName);
  const canvas = createCanvas(width+padding, height+padding);
  const ctx = canvas.getContext("2d");
  
  ctx.shadowColor = outlineColor;
  ctx.shadowBlur = 0;

  for (var offsetX = -1; offsetX <= 1; offsetX++) {
    for (var offsetY = -1; offsetY <= 1; offsetY++) {
      // Set shadow offset
      ctx.shadowOffsetX = offsetX;
      ctx.shadowOffsetY = offsetY;

      // Draw image with shadow
      ctx.drawImage(image, 0, 0, width, height);
    }
  }
  ctx2.save();
  ctx2.translate(x-image.width / 2, y-image.height / 2);
  ctx2.rotate((-45 * Math.PI) / 180);
  ctx2.scale(1, 1.8);
  ctx2.drawImage(ctx.canvas, 0, 0, width+padding, height+padding);
  ctx2.restore();

}
