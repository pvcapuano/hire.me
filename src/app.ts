import express from "express";
import urlRoutes from "./routes/urlRoutes";

const app = express();

app.use(express.json());
app.use(urlRoutes);

export default app;
