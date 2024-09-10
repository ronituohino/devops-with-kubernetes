// ping-pong

const Koa = require("koa");
const app = new Koa();

const fs = require("node:fs");
const PING_PONG_FILE_PATH = "./files/pings.txt";

app.use(async (ctx) => {
  try {
    let counter = 0;
    const fileExists = fs.existsSync(PING_PONG_FILE_PATH);
    if (fileExists) {
      const counterStr = await fs.promises.readFile(PING_PONG_FILE_PATH, {
        encoding: "utf-8",
      });
      counter = parseInt(counterStr);
    }

    counter += 1;
    ctx.body = `pong ${counter}`;

    try {
      console.log("Attempting to make dir");
      await fs.promises.mkdir("./files");
    } catch (err) {}
    await fs.promises.writeFile(PING_PONG_FILE_PATH, counter.toString(), {
      encoding: "utf-8",
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(3001);
