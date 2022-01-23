import { isButtonElement, isCanvasElement, isNullish } from "./helper";
import draw from "./julia";

// webassembly
import("../pkg/index").then(({ draw }) => {
  const wasmBtn = document.getElementById("render_wasm");
  if (!isButtonElement(wasmBtn)) throw new Error("object is not a button element.");
  wasmBtn.disabled = false;
  wasmBtn.addEventListener("click", () => {
    // wasm draw
    const start = performance.now();
    draw();
    const end = performance.now();
    console.log(`\ttotal: ${end - start}[ms]`);
  });
}).catch(console.error);

// javascript
const jsBtn = document.getElementById("render_js");
if (!isButtonElement(jsBtn)) throw new Error("object is not a button element.");
jsBtn.addEventListener("click", () => {
  // js draw
  const start = performance.now();
  draw();
  const end = performance.now();
  console.log(`\ttotal: ${end - start}[ms]`);
});

// clear
const clearBtn = document.getElementById("clear");
if (!isButtonElement(clearBtn)) throw new Error("object is not a button element.");
clearBtn.addEventListener("click", () => {
  const canvas = document.getElementById("julia");
  if (!isCanvasElement(canvas)) throw new Error("could not get canvas element.");
  const context = canvas.getContext("2d");
  if (isNullish(context)) throw new Error("could not get context.");
  context.clearRect(0, 0, canvas.width, canvas.height);
});
