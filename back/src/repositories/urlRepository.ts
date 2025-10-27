import { AppDataSource } from "../config/data-source";
import { Url } from "../entities/Url";

const urlRepo = AppDataSource.getRepository(Url);

export async function createUrl(originalUrl: string, customAlias?: string) {
  if (customAlias) {
    const existing = await urlRepo.findOneBy({ custom_alias: customAlias });
    if (existing) throw new Error("CUSTOM_ALIAS_ALREADY_EXISTS");
  }

  const alias = customAlias || Math.random().toString(36).substring(2, 8);

  const newUrl = urlRepo.create({
    original_url: originalUrl,
    custom_alias: alias,
  });

  return await urlRepo.save(newUrl);
}

export async function getUrlByAlias(alias: string) {
  const url = await urlRepo.findOneBy({ custom_alias: alias });
  if (!url) throw new Error("SHORTENED_URL_NOT_FOUND");
  return url;
}
