import express from "express";
import { retrieveUrl, shortenUrl } from "../controllers/UrlController";

const router = express.Router();

router.put("/create", shortenUrl);
router.get("/u/:alias", retrieveUrl);

export default router;
