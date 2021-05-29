export function removeUnit(
  value: string,
  ...args: [pattern: RegExp, factor: number][]
): number | null {
  for (let arg of args) {
    if (value.search(arg[0]) >= 0) {
      const n = Number(value.replace(arg[0], ''));
      if (!isNaN(n)) return n * arg[1];
    }
  }
  return null;
}
