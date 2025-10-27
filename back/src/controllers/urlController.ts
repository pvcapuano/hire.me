import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Url } from "../entities/Url";

export const shortenUrl = async (req: Request, res: Response) => {
  const originalUrl = req.query.url as string;
  const customAlias = req.query.CUSTOM_ALIAS as string;

  if (!originalUrl) {
    return res
      .status(400)
      .json({ err_code: "003", description: "URL is required" });
  }

  try {
    const urlRepo = AppDataSource.getRepository(Url);

    if (customAlias) {
      const existing = await urlRepo.findOneBy({ custom_alias: customAlias });
      if (existing) {
        return res.status(400).json({
          alias: customAlias,
          err_code: "001",
          description: "CUSTOM ALIAS ALREADY EXISTS",
        });
      }
    }

    const alias = customAlias || generateRandomAlias();

    const newUrl = urlRepo.create({
      original_url: originalUrl,
      custom_alias: alias,
    });

    await urlRepo.save(newUrl);

    return res.json({
      alias: newUrl.custom_alias,
      url: `http://localhost:3000/u/${newUrl.custom_alias}`,
      statistics: { time_taken: "10ms" },
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err_code: "500", description: err.message });
  }
};

export const retrieveUrl = async (req: Request, res: Response) => {
  const alias = req.params.alias;

  try {
    const urlRepo = AppDataSource.getRepository(Url);
    const urlRecord = await urlRepo
      .createQueryBuilder("url")
      .where("LOWER(url.custom_alias) = LOWER(:alias)", { alias })
      .getOne();


    if (!urlRecord) {
      return res.status(404).json({
        err_code: "002",
        description: "SHORTENED URL NOT FOUND",
        statistics: { time_taken: "0ms" },
      });
    }

    urlRecord.access_count += 1;
    await urlRepo.save(urlRecord);

    let redirectUrl = urlRecord.original_url;
    if (
      !redirectUrl.startsWith("http://") &&
      !redirectUrl.startsWith("https://")
    ) {
      redirectUrl = "http://" + redirectUrl;
    }

    return res.redirect(redirectUrl);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err_code: "500", description: err.message });
  }
};

function generateRandomAlias(): string {
  return Math.random().toString(36).substring(2, 8);
}

export async function getTopUrls(req: Request, res: Response) {
  try {
    const urlRepository = AppDataSource.getRepository(Url);

    const topUrls = await urlRepository
      .createQueryBuilder("url")
      .select("url.original_url", "original_url")
      .addSelect("SUM(url.access_count)", "total_access_count")
      .groupBy("url.original_url")
      .orderBy("total_access_count", "DESC")
      .limit(10)
      .getRawMany();

    return res.status(200).json(topUrls);
  } catch (error) {
    console.error("Error fetching most visited URLs:", error);
    return res.status(500).json({
      err_code: "500",
      description: "Error fetching most visited URLs.",
    });
  }
}
