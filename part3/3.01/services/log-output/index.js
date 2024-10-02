// Log output

const Koa = require("koa");
const app = new Koa();

const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const id = crypto.randomUUID();

async function getPings() {
  try {
    const result = await fetch("http://ping-pong-svc:2346/count");
    const str = await result.text();
    return str;
  } catch (err) {
    return "0";
  }
}

app.use(async (ctx) => {
  const pings = await getPings();
  const date = new Date();

  let fileContent = "";
  try {
    const data = await fs.readFile("./config/information.txt", {
      encoding: "utf8",
    });
    fileContent = data;
  } catch (err) {
    console.error("Error reading information.txt: " + err);
  }
  const envVar = process.env.MESSAGE || "";

  const content = `file content: ${fileContent} 
env variable: ${envVar}
${date.toISOString()}: ${id}
Ping / Pongs: ${pings}`;

  ctx.body = content;
});

app.listen(3000);
