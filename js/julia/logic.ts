import {
  black,
  blackToBlue,
  blueToMagenta,
  cyanToGreen,
  greenToYellow,
  magentaToWhite,
  redToBlack,
  whiteToCyan,
  yellowToRed
} from "./colors";

const juliaSet = (
  width: number,
  height: number,
  minReal: number,
  maxReal: number,
  minImag: number,
  maxImag: number,
  cReal: number,
  cImag: number,
  maxCount: number
) => {
  const data: Array<number> = [];
  for (let i = 0; i < height; i++) {
    const zImag = ((maxImag - minImag) / height) * i + minImag;
    for (let j = 0; j < width; j++) {
      const zReal = ((maxReal - minReal) / width) * j + minReal;
      const count = getCount(zReal, zImag, cReal, cImag, maxCount);
      setColor(data, count);
    }
  }
  return data;
};

const getCount = (
  zReal: number,
  zImag: number,
  cReal: number,
  cImag: number,
  maxCount: number
) => {
  for (let i = 1; i < maxCount; i++) {
    const real = zReal * zReal - zImag * zImag + cReal;
    const imag = 2.0 * zReal * zImag + cImag;
    zReal = real;
    zImag = imag;
    if (zReal * zReal + zImag * zImag > 4.0) {
      return i;
    }
  }
  return 0;
};

const setColor = (data: Array<number>, count: number) => {
  if (count === 0) {
    black(data);
    return;
  }
  const sqrt = Math.sqrt(count);
  const d = (sqrt % 32) * 8;
  const m = (d / 32) | 0;
  switch (m) {
    case 0:
      blueToMagenta(data, d);
      break;
    case 1:
      magentaToWhite(data, d);
      break;
    case 2:
      whiteToCyan(data, d);
      break;
    case 3:
      cyanToGreen(data, d);
      break;
    case 4:
      greenToYellow(data, d);
      break;
    case 5:
      yellowToRed(data, d);
      break;
    case 6:
      redToBlack(data, d);
      break;
    case 7:
      blackToBlue(data, d);
      break;
    default:
      black(data);
      break;
  }
};

export default juliaSet;
