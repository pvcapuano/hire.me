import express from "express";
import {
  getTopUrls,
  retrieveUrl,
  shortenUrl,
} from "../controllers/urlController";

const router = express.Router();

router.put("/create", shortenUrl);
router.get("/u/:alias", retrieveUrl);
router.get("/top", getTopUrls);

export default router;
