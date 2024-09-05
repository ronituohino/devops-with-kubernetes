// ping-pong

const Koa = require("koa");
const app = new Koa();

let counter = 0;

app.use((ctx) => {
  ctx.body = `pong ${counter}`;
  counter += 1;
});

app.listen(3001);
