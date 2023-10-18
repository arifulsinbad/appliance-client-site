export const errorMessage = (
  obj: Record<string, any>,
  propertyPath: string
) => {
  const property = propertyPath.split(".");
  let value = obj;

  for (let props of property) {
    if (value[props]) {
      value = value[props];
    } else {
      return undefined;
    }
  }
  return value.message;
};
