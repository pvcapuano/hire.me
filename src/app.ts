import express from "express";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlRoutes);
setupSwagger(app);

export default app;
