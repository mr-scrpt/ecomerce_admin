export const getFormDataValue = (
  str: FormDataEntryValue | null | undefined,
): string | null => {
  return typeof str === "string" && str.trim() !== "" ? str : null;
};
