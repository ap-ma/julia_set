export const isNullish = (argment: unknown): argment is null | undefined => {
  if (typeof argment === "undefined") return true;
  if (argment === null) return true;
  return false;
};

export const isButtonElement = (
  target: HTMLElement | null
): target is HTMLButtonElement =>
  !isNullish(target) && target instanceof HTMLButtonElement;

export const isCanvasElement = (
  target: HTMLElement | null
): target is HTMLCanvasElement =>
  !isNullish(target) && target instanceof HTMLCanvasElement;

export const getInputValAsNum = (id: string) => {
  const element = document.getElementById(id);
  if (isNullish(element)) throw new Error(`element with the id "${id}" does not exist.`);
  if (element instanceof HTMLInputElement) {
    const value = element.valueAsNumber;
    if (isNaN(value)) throw new Error(`value of the element with the id "${id}" is not a number.`);
    return value;
  }
  throw new Error(`element with the id "${id}" is not an InputElement.`);
};
