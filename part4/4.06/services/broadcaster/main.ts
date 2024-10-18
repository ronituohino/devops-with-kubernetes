import { connect, StringCodec } from "npm:nats";

const natsUrl = Deno.env.get("NATS_URL");
if (!natsUrl) {
  console.error("Nats url missing");
  Deno.exit();
}

const nc = await connect({ servers: natsUrl });
const sc = StringCodec();
const sub = nc.subscribe("hello");

(async () => {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    notify(sc.decode(m.data));
  }
  console.log("subscription closed");
})();

async function notify(payload: string) {
  const webhookUrl = Deno.env.get("DISCORD_WEBHOOK_URL");
  if (!webhookUrl) {
    console.error("Discord webhook url not specified");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: payload,
      avatar_url: "https://imgur.com/KEungv8",
      username: "K8s Todo App",
    }),
  });

  if (!response.ok) {
    console.error("Error sending Discord notification");
  }
}
