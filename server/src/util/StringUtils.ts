/**
 * Converts string into camelCase.
 *
 * @see http://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 */
export function camelCase(str: string, firstCapital: boolean = false): string {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
    if (firstCapital === true && offset === 0) return p1;
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
}

/**
 * Converts string into snake-case.
 *
 * @see https://regex101.com/r/QeSm2I/1
 */
export function snakeCase(str: string) {
  return str
    .replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, "$1_$3$2$4")
    .toLowerCase();
}

/**
 * Converts string into Title Case.
 *
 * @see http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
 */
export function titleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export function random5String() {
  return Math.random()
    .toString(36)
    .substr(2, 5);
}

export function randomFileName() {
  const dateTime = Date.now();

  return `${random5String()}${random5String()}${random5String()}${random5String()}${dateTime}`;
}

export function keyValue2Str(obj: any) {
  const arr = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(key + "=" + obj[key]);
    }
  }
  return arr.join("&");
}
