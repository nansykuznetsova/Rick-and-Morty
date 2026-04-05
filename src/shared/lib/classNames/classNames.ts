type ClassDictionary = Record<string, boolean | undefined | null>;

export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassValue[];

function appendClasses(value: ClassValue, out: string[]): void {
  if (value == null || value === false) {
    return;
  }

  if (typeof value === 'string') {
    if (value) {
      out.push(value);
    }
    return;
  }

  if (typeof value === 'number') {
    if (Number.isFinite(value)) {
      out.push(String(value));
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendClasses(item, out);
    }
    return;
  }

  if (typeof value === 'object') {
    for (const key of Object.keys(value)) {
      if (value[key as keyof ClassDictionary]) {
        out.push(key);
      }
    }
  }
}

export function classNames(...args: ClassValue[]): string {
  const out: string[] = [];
  for (const arg of args) {
    appendClasses(arg, out);
  }
  return out.join(' ');
}
