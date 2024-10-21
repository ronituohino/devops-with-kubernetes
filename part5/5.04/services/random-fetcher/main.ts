const mode = Deno.env.get("MODE");

console.log("Initializing fetcher.");

let response = null;
if (mode === "init") {
  console.log("Mode init selected.");
  response = await fetch("https://en.wikipedia.org/wiki/Kubernetes");
} else if (mode === "random") {
  console.log("Mode random selected.");
  response = await fetch("https://en.wikipedia.org/wiki/Special:Random");
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // Random wait between 5 and 15 mins
  const waitTime = (5 * 60 + Math.random() * 10 * 60) * 1000;
  console.log(`Waiting for ${waitTime}ms`);
  await sleep(waitTime);
}

if (response && response.ok && response.body) {
  console.log("Writing to file.");
  await Deno.writeFile("/usr/share/nginx/html/index.html", response.body);
}
