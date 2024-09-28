const router = require("koa-router")();

let counter = 0;

router.get("/", async (ctx) => {
  counter += 1;
  ctx.body = `pong ${counter}`;
});

router.get("/count", async (ctx) => {
  ctx.body = counter;
});

module.exports = router;
