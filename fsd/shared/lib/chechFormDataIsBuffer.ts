export const checkFormDataIsBuffer = (value: FormDataEntryValue): Boolean =>
  !!(typeof value === "object" && "arrayBuffer" in value);
