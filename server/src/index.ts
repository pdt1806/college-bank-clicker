import { cors } from "@elysiajs/cors";
import { config } from "dotenv";
import { Elysia } from "elysia";

config({ path: "../.env" });

const app = new Elysia()
  .use(cors())
  .get("/", () => "Discord Embed Activity API for College Bank Clicker")
  .post("/api/token", async ({ body }: { body: { code: string } }) => {
    const { code } = body as { code: string };

    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
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
  .listen(7425);

console.log(`CB Clicker API is running at http://${app.server?.hostname}:${app.server?.port}`);
