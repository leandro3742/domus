export interface AggregateDirectorsOptions {
  caseFolding?: boolean;
  trim?: boolean;
}

export const aggregateDirectors = (
  directors: Array<string | null | undefined>,
  options: AggregateDirectorsOptions = {}
): Record<string, number> => {
  const { caseFolding = false, trim = true } = options;
  const map: Record<string, number> = {};

  for (const raw of directors) {
    if (raw == null) continue;

    let name = raw;

    if (trim) {
      name = name.trim();
      if (!name) continue;
    }

    if (caseFolding) {
      name = name.toLocaleLowerCase();
    }

    if (map[name]) {
      map[name] += 1;
    } else {
      map[name] = 1;
    }
  }

  return map;
};
