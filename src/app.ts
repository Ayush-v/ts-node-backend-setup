import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
const app: Application = express();

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || "8080";

app.use("*", (req, res) => {
  res.status(404).send(`${req.originalUrl} not found on this *server*`);
});

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT} 🚀`);
});
