import express, { Request, Response, NextFunction } from "express";
import config from "./config";
import { UserController } from "./controllers";
const app = express();
import connectDB from "./loaders/db";
import routes from "./routes";
var cookieParser = require("cookie-parser");

require("dotenv").config();

connectDB(); //몽고디비에 연결

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(UserController.checkAuth);

app.use(routes); //라우터
// error handler

interface ErrorType {
  message: string;
  status: number;
}

app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//포트 열고 서버 띄우기
app
  .listen(config.port, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
