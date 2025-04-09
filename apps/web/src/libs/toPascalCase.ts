export function toPascalCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/_./g, (match) => ` ${match[1].toUpperCase()}`)
    .replace(/^\w/, (c) => c.toUpperCase());
}
