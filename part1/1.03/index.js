// Log output

const crypto = require("node:crypto");
const id = crypto.randomUUID();

setInterval(() => {
  const date = new Date();
  console.log(`${date.toISOString()}: ${id}`);
}, 5000);
