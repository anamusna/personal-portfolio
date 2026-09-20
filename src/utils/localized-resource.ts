import i18n from "../i18n";

type LocalizedResource = Record<string, unknown> | Array<unknown>;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getLocalizedValue = <T extends LocalizedResource>(
  key: string,
  defaultValue: T,
): T =>
  (i18n as any).t(key, {
    returnObjects: true,
    defaultValue,
  }) as T;

export const createLocalizedResource = <T extends LocalizedResource>(
  key: string,
  defaultValue: T,
): T => {
  const initialValue = getLocalizedValue(key, defaultValue);

  if (Array.isArray(defaultValue)) {
    const safeInitialItems = Array.isArray(initialValue)
      ? (initialValue as unknown[])
      : (defaultValue as unknown[]);
    const liveArray = [...safeInitialItems] as unknown as T;
    i18n.on("languageChanged", () => {
      const nextValue = getLocalizedValue(key, defaultValue);
      const liveTarget = liveArray as unknown as unknown[];
      const nextItems = Array.isArray(nextValue)
        ? (nextValue as unknown[])
        : (defaultValue as unknown[]);
      liveTarget.splice(0, liveTarget.length, ...nextItems);
    });
    return liveArray;
  }

  const safeInitialObject = isPlainObject(initialValue)
    ? initialValue
    : (defaultValue as Record<string, unknown>);
  const liveObject = { ...safeInitialObject } as T;
  i18n.on("languageChanged", () => {
    const nextValue = getLocalizedValue(key, defaultValue);
    const liveTarget = liveObject as Record<string, unknown>;
    Object.keys(liveTarget).forEach((objectKey) => {
      delete liveTarget[objectKey];
    });
    const nextObject = isPlainObject(nextValue)
      ? nextValue
      : (defaultValue as Record<string, unknown>);
    Object.assign(liveTarget, nextObject);
  });
  return liveObject;
};
