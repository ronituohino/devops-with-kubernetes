// Log output

const Koa = require("koa");
const app = new Koa();

const FILE_PATH = "./files/date.txt";

const crypto = require("node:crypto");
const id = crypto.randomUUID();

const fs = require("node:fs/promises");
async function getDateFromFile() {
  try {
    const data = await fs.readFile(FILE_PATH, { encoding: "utf-8" });
    return data;
  } catch (err) {
    console.error(err);
  }
}

app.use(async (ctx) => {
  const date = await getDateFromFile();
  ctx.body = date ? `${date}: ${id}` : "Error";
});

app.listen(3000);
