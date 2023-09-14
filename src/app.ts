import express, { Application } from "express";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
import morgan from "morgan";
const app: Application = express();

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

const PORT = process.env.PORT || "8080";
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use("*", (req, res) => {
  res.status(404).send(`${req.originalUrl} not found on this *server*`);
});

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT} 🚀`);
});
