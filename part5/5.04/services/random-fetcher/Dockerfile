FROM denoland/deno:2.0.2

WORKDIR /app

COPY . .

RUN deno install

USER deno

CMD ["run", "--allow-net", "--allow-env", "--allow-write", "main.ts"]
