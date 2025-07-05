import { DiscordSDK } from "@discord/embedded-app-sdk";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { GameDataStore } from "./Stores/GameDataStore";

export default function DiscordSDKComponent() {
  useEffect(() => {
    const isDiscordEmbed = new URLSearchParams(window.location.search).has("frame_id");
    if (!isDiscordEmbed) {
      console.log("Not initializing Discord SDK");
      return;
    }

    const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
    const startTime = Date.now();

    const setup = async () => {
      try {
        await discordSdk.ready();

        const { code } = await discordSdk.commands.authorize({
          client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
          response_type: "code",
          state: "",
          prompt: "none",
          scope: ["identify", "rpc.activities.write"],
        });

        try {
          const response = await fetch(`/.proxy/api/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
            }),
          });
          if (!response.ok) {
            throw new Error(`Failed to exchange code for access token: ${response.statusText}`);
          }
          const { access_token } = await response.json();

          const auth = await discordSdk.commands.authenticate({
            access_token,
          });

          if (!auth) throw new Error("Failed to authenticate with Discord SDK");
        } catch (error) {
          console.error("Failed to authenticate with Discord SDK:", error);
          notifications.show({
            title: "Authentication Error",
            message: (error as Error).message,
            color: "red",
            autoClose: 10000,
          });
        }

        const updatePresence = async () => {
          try {
            const { money } = GameDataStore.getState();

            await discordSdk.commands.setActivity({
              activity: {
                type: 0, // Playing
                details: `Money: $${Math.trunc(money).toLocaleString()}`,
                state: "In Game",
                timestamps: {
                  start: startTime,
                },
                assets: {
                  large_image: "apple-touch-icon",
                  large_text: "College Bank Clicker",
                },
              },
            });

            setTimeout(updatePresence, 5000); // Re-update after 5s
          } catch (error) {
            console.error("Failed to update presence:", error);
            notifications.show({
              title: "Presence Update Error",
              message: (error as Error).message,
              color: "red",
            });
          }
        };

        updatePresence();
      } catch (e) {
        console.error("Failed to initialize Discord SDK:", e);
      }
    };

    setup();
  }, []); // <- only run once on mount

  return null;
}
