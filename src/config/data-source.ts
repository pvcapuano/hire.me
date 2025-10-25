import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Url } from "../entities/Url";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Url],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
