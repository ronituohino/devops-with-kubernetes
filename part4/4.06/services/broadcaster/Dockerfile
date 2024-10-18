FROM denoland/deno:2.0.2

WORKDIR /app
USER deno

COPY deps.ts .
RUN deno install --entrypoint deps.ts

COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-net", "main.ts"]
