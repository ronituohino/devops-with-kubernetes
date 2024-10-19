import { connect, StringCodec } from "npm:nats";

const natsUrl = Deno.env.get("NATS_URL");
if (!natsUrl) {
  console.error("Nats url missing");
  Deno.exit();
}

const nc = await connect({ servers: natsUrl });
const sc = StringCodec();
const sub = nc.subscribe("todos", { queue: "message-broadcast" });

const disabledNotifications =
  Deno.env.get("NOTIFICATIONS_DISABLED") !== undefined;

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

async function watchMessages() {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);

    if (!disabledNotifications) {
      notify(sc.decode(m.data));
    }
  }
  console.log("Subscription closed");
}

console.log("Broadcaster watching for messages!");
await watchMessages();
