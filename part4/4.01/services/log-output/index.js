// Log output
import Koa from "koa";
const app = new Koa();

import { router } from "./routes.js";
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
