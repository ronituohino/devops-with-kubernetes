// ping-pong

const Koa = require("koa");
const app = new Koa();

const router = require("./routes");

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);
