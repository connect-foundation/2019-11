import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";

/**
 * middlewares
 */
import morganLogger from "morgan";

const app = express();

/**
 * routing-controllers에서 기본으로 적용되는 middlewares
 *  1. body-parser
 *  2. multer
 */
app.use(cors());
app.use(morganLogger("dev"));
app.use(express.static(path.resolve("src", "public")));
// app.use(express.static(path.resolve(__dirname, 'public')));

/**
 * View EJS 설정
 */
app.set("views", path.join("views"));
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
  res.render("login");
});

export default app;
