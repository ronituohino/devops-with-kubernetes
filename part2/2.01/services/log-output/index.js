// Log output

const Koa = require("koa");
const app = new Koa();

const crypto = require("node:crypto");
const id = crypto.randomUUID();

async function getPings() {
  try {
    const result = await fetch("http://ping-pong-svc:2346");
    const str = await result.text();
    return str.split(" ")[1];
  } catch (err) {
    return "0";
  }
}

app.use(async (ctx) => {
  const pings = await getPings();
  const date = new Date();
  ctx.body = `${date.toISOString()}: ${id}`.concat(
    pings ? `\nPing / Pongs: ${pings}` : ""
  );
});

app.listen(3000);
