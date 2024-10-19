import pg from "pg";
const { Client } = pg;

const client = new Client({
  host: "postgres-svc",
  password: process.env.PG_PASSWORD,
  user: process.env.PG_USER,
  database: process.env.PG_DB,
  port: 5432,
  ssl: false,
});
await client.connect();

import util from "util";

export async function initDatabase() {
  console.log("Initializing Postgres database");

  await client.query("CREATE TABLE IF NOT EXISTS Counter (id int, total int)");
  await client.query(
    "INSERT INTO Counter (id, total) VALUES (0, 0) ON CONFLICT DO NOTHING"
  );
}

export async function increaseCounter() {
  const total = await getCounter();

  const result = await client.query(
    "UPDATE Counter SET total=$1 WHERE id=0 RETURNING total",
    [total + 1]
  );

  console.log("inc");
  console.log(util.inspect(result, false, null, true /* enable colors */));
  return result.rows[0].total;
}

export async function getCounter() {
  const result = await client.query("SELECT total FROM Counter WHERE id=0");

  console.log("get");
  console.log(util.inspect(result, false, null, true /* enable colors */));
  return result.rows[0].total;
}
