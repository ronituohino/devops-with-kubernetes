import { increaseCounter, getCounter } from "./db.js";
import KoaRouter from "koa-router";
const router = new KoaRouter();

const rootResponse = async (ctx) => {
  const counter = await increaseCounter();
  ctx.body = `pong ${counter}`;
};
router.get("/", rootResponse);
router.get("/pingpong", rootResponse);

const countResponse = async (ctx) => {
  const counter = await getCounter();
  ctx.body = counter;
};
router.get("/count", countResponse);
router.get("/pingpong/count", countResponse);

const healthResponse = async (ctx) => {
  try {
    const counter = await getCounter();
    if (Number.isInteger(counter)) {
      ctx.body = "ok";
      return;
    }
  } catch (err) {}
  ctx.throw(500, "db not ready");
};
router.get("/healthz", healthResponse);
router.get("/pingpong/healthz", healthResponse);

export { router };
