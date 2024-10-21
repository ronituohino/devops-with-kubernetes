// ping-pong
import Koa from "koa";
const app = new Koa();

import { router } from "./routes.js";
app.use(router.routes());
app.use(router.allowedMethods());

import { initDatabase } from "./db.js";
initDatabase().then(() => {
  app.listen(8081);
});
