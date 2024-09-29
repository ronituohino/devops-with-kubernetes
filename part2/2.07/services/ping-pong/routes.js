import { increaseCounter, getCounter } from "./db.js";
import KoaRouter from "koa-router";
const router = new KoaRouter();

router.get("/", async (ctx) => {
  const counter = await increaseCounter();
  ctx.body = `pong ${counter}`;
});

router.get("/count", async (ctx) => {
  const counter = await getCounter();
  ctx.body = counter;
});

export { router };
