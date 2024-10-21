import KoaRouter from "koa-router";
const router = new KoaRouter();

import fs from "node:fs/promises";
import crypto from "node:crypto";
const id = crypto.randomUUID();

async function getPings() {
  try {
    const result = await fetch(
      "http://ping-pong-svc.exercise.svc.cluster.local/count"
    );
    const str = await result.text();
    return str;
  } catch (err) {
    return "error";
  }
}

const rootResponse = async (ctx) => {
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
};
router.get("/", rootResponse);

const healthResponse = async (ctx) => {
  const pings = await getPings();
  if (pings !== "error") {
    ctx.body = "ok";
    return;
  }

  ctx.throw(500, "ping-pong not ready");
};
router.get("/healthz", healthResponse);

export { router };
