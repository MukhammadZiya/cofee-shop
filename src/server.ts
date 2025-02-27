import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
import mongoose from "mongoose";
import server from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("Connected to MongoDB successfully ");
    const PORT = process.env.PORT ?? 4003;
    server.listen(PORT, function () {
      console.info(`The server is running successfully on port: ${PORT}`);
      console.info(`Admin project  http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => console.log("ERROR on connecting to MongoDB", err));
