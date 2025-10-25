import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Url } from "../entities/Url";

export const shortenUrl = async (req: Request, res: Response) => {
  const originalUrl = req.query.url as string;
  const customAlias = req.query.CUSTOM_ALIAS as string | undefined;

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
      statistics: {
        time_taken: "10ms",
      },
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

    const urlRecord = await urlRepo.findOneBy({ custom_alias: alias });

    if (!urlRecord) {
      return res.status(404).json({
        err_code: "002",
        description: "SHORTENED URL NOT FOUND",
        statistics: { time_taken: "0ms" },
      });
    }

    urlRecord.access_count += 1;
    await urlRepo.save(urlRecord);

    return res.redirect(urlRecord.original_url);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ err_code: "500", description: err.message });
  }
};

function generateRandomAlias(): string {
  return Math.random().toString(36).substring(2, 8);
}
