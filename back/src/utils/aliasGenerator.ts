import { v4 as uuidv4 } from "uuid";

export const generateAlias = (): string =>
  uuidv4().replace(/-/g, "").slice(0, 6);
