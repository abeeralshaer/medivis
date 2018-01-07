export function* values(obj) {
  if (obj) {
    for (let prop of Object.keys(obj)) yield obj[prop];
  }
}
