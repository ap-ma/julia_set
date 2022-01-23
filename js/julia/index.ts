import { getInputValAsNum, isCanvasElement, isNullish } from "../helper";
import juliaSet from "./logic";

export default function () {
  console.log("run with js");

  const canvas = document.getElementById("julia");
  if (!isCanvasElement(canvas)) throw new Error("could not get canvas element.");
  const context = canvas.getContext("2d");
  if (isNullish(context)) throw new Error("could not get context.");

  const width = canvas.width;
  const height = canvas.height;
  const minReal = getInputValAsNum("minReal");
  const maxReal = getInputValAsNum("maxReal");
  const minImag = getInputValAsNum("minImag");
  const maxImag = getInputValAsNum("maxImag");
  const cReal = getInputValAsNum("cReal");
  const cImag = getInputValAsNum("cImag");
  const maxCount = getInputValAsNum("maxCount");

  // ジュリア集合生成
  const genStart = performance.now();
  const result = juliaSet(
    width,
    height,
    minReal,
    maxReal,
    minImag,
    maxImag,
    cReal,
    cImag,
    maxCount
  );
  const genEnd = performance.now();

  // Canvasに描画
  const drawStart = performance.now();
  const img = new ImageData(new Uint8ClampedArray(result), width, height);
  context.putImageData(img, 0, 0);
  const drawEnd = performance.now();

  // 処理時間
  console.log(`\tgenerate: ${genEnd - genStart}[ms]`);
  console.log(`\tdraw: ${drawEnd - drawStart}[ms]`);
}
