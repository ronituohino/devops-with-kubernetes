// Log output

const Koa = require("koa");
const app = new Koa();

const crypto = require("node:crypto");
const id = crypto.randomUUID();

app.use((ctx) => {
  const date = new Date();
  ctx.body = `${date.toISOString()}: ${id}`;
});

setInterval(() => {
  const date = new Date();
  console.log(`${date.toISOString()}: ${id}`);
}, 5000);

app.listen(3000);
