import { server } from "./server";
import { createConnection } from "typeorm";
import * as express from "express";
import * as session from "express-session";

const main = async () => {
  const PORT = 8000;
  const app = express();
  await createConnection();

  app.use(
    session({
      secret: "asdjlfkaasdfkjlads",
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({
    app,
    path: "/",
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  });
  app.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
};

main();
