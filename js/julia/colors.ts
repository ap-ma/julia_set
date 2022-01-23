export const black = (data: Array<number>) => {
  data.push(0);
  data.push(0);
  data.push(0);
  data.push(255);
};

export const blueToMagenta = (data: Array<number>, d: number) => {
  data.push(63 + 6 * d);
  data.push(63);
  data.push(255);
  data.push(255);
};

export const magentaToWhite = (data: Array<number>, d: number) => {
  data.push(255);
  data.push(63 + 6 * (d - 32));
  data.push(255);
  data.push(255);
};

export const whiteToCyan = (data: Array<number>, d: number) => {
  data.push(255 - 6 * (d - 64));
  data.push(255);
  data.push(255);
  data.push(255);
};

export const cyanToGreen = (data: Array<number>, d: number) => {
  data.push(63);
  data.push(255);
  data.push(255 - 6 * (d - 96));
  data.push(255);
};

export const greenToYellow = (data: Array<number>, d: number) => {
  data.push(63 + 6 * (d - 128));
  data.push(255);
  data.push(63);
  data.push(255);
};

export const yellowToRed = (data: Array<number>, d: number) => {
  data.push(255);
  data.push(255 - 6 * (d - 160));
  data.push(63);
  data.push(255);
};

export const redToBlack = (data: Array<number>, d: number) => {
  data.push(255 - 6 * (d - 192));
  data.push(63);
  data.push(63);
  data.push(255);
};

export const blackToBlue = (data: Array<number>, d: number) => {
  data.push(63);
  data.push(63);
  data.push(63);
  data.push(63 + 6 * (d - 224));
};