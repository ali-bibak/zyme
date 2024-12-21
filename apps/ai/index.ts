import express from "express";
import "dotenv/config";
import router from "./src/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.BASE_URL}:${PORT}`);
});
