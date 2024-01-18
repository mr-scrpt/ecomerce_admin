import { join } from "node:path";

export const CATALOG_PUBLIC = "public";
export const CATALOG_TMP = "temp";
export const CATALOG_GARBAGE = "garbage";

export const PATH_PUBLIC_FULL = join(process.cwd(), CATALOG_PUBLIC);
export const PATH_PUBLIC_TMP = join(PATH_PUBLIC_FULL, CATALOG_TMP);
export const PATH_PUBLIC_GARBAGE = join(PATH_PUBLIC_FULL, CATALOG_GARBAGE);
