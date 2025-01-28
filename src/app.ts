import cors from "cors";
import express, { urlencoded } from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";
import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";
import { Server as SocketIOServer } from "socket.io";
import http from "http";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "session",
});

// kirish
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

// sessions

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 6, //3h
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  const sessioInstance = req.session as T;
  res.locals.member = sessioInstance.member;
  next();
});

//view
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//router
app.use("/admin", routerAdmin);
app.use("/", router); //Middleware design pattern

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

let summaryClient = 0 
io.on("connection", (socket) => {
  summaryClient++;
  console.log(`Connection & total [${summaryClient}]`)

  socket.on("disconnect", () => {
    summaryClient--;
    console.log(`Disconnect & total [${summaryClient}]`)
  })
})





export default server;
