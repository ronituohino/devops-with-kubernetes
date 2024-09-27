const router = require("koa-router")();

let counter = 0;

router.get("/pingpong", async (ctx) => {
  counter += 1;
  ctx.body = `pong ${counter}`;
});

router.get("/pingpong/count", async (ctx) => {
  ctx.body = counter;
});

module.exports = router;
