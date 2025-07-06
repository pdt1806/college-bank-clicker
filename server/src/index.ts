import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

const isDev = process.argv.includes("--dev");
const CLIENT_ID = isDev ? process.env.DEV_DISCORD_CLIENT_ID : process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = isDev ? process.env.DEV_DISCORD_CLIENT_SECRET : process.env.DISCORD_CLIENT_SECRET;

const app = new Elysia()
  .use(cors())
  .get("/", () => "Discord Embed Activity API for College Bank Clicker")
  .post("/api/token", async ({ body }: { body: { code: string } }) => {
    const { code } = body as { code: string };

    const params = new URLSearchParams({
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      grant_type: "authorization_code",
      code: code,
    });

    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();

    return {
      access_token: data.access_token,
    };
  })
  .get("/api/export", ({ query, set }: { query: { data: string }; set: any }) => {
    const base64 = query.data;
    if (!base64) return new Response("No data provided", { status: 400 });

    const json = decodeURIComponent(Buffer.from(query.data, "base64").toString("utf-8"));
    const filename = `college-bank-clicker-export-${new Date().toISOString()}.json`;
    set.headers = {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
    };
    return json;
  })
  .listen(7425);

console.log(
  `CB Clicker API is running at http://${app.server?.hostname}:${app.server?.port}` +
    (isDev ? " (development mode)" : "")
);
