// Log output

const Koa = require("koa");
const app = new Koa();

const crypto = require("node:crypto");
const id = crypto.randomUUID();

const fs = require("node:fs");
const PING_PONG_FILE_PATH = "./files/pings.txt";

app.use(async (ctx) => {
  let pings = null;
  if (fs.existsSync(PING_PONG_FILE_PATH)) {
    const pingsStr = await fs.promises.readFile(PING_PONG_FILE_PATH, {
      encoding: "utf-8",
    });
    pings = parseInt(pingsStr);
  }

  const date = new Date();
  ctx.body = `${date.toISOString()}: ${id}`.concat(
    pings ? `\nPing / Pongs: ${pings}` : ""
  );
});

app.listen(3000);
