import { DiscordSDK } from "@discord/embedded-app-sdk";
import { useEffect } from "react";
import { DiscordStore } from "./Stores/DiscordStore";
import { GameDataStore } from "./Stores/GameDataStore";

const startTime = Date.now();

let discordSdk: DiscordSDK;

export default function DiscordSDKComponent() {
  const isDiscordEmbed = new URLSearchParams(window.location.search).has("frame_id");

  useEffect(() => {
    if (!isDiscordEmbed) return;

    const { setIsInDiscord, setUser } = DiscordStore.getState();

    discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
    setIsInDiscord(true);

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

          setUser(auth.user);

          console.log("Authenticated with Discord SDK:", auth.user);
        } catch (error) {
          console.error("Failed to authenticate with Discord SDK:", error);
        }

        updatePresence();
        setInterval(updatePresence, 15 * 1000); // Update presence every 15 seconds
        handleDiscordExternalURL();
      } catch (e) {
        console.error("Failed to initialize Discord SDK:", e);
      }
    };

    setup();
  }, []); // <- only run once on mount

  const handleDiscordExternalURL = () => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a") as HTMLAnchorElement | null;

      if (anchor && anchor.href) {
        const url = anchor.href;

        const isMailto = url.startsWith("mailto:");
        const isExternal = url.startsWith("http") && !url.startsWith(window.location.origin);

        // Only intercept external links
        if (isExternal || isMailto) {
          event.preventDefault();
          discordSdk.commands.openExternalLink({ url });
        }
      }
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  };

  useEffect(() => {
    const unsubscribe = DiscordStore.subscribe(() => {
      updatePresence();
    });

    return () => unsubscribe();
  }, []);

  return null;
}

export const updatePresence = async () => {
  try {
    const { money } = GameDataStore.getState();
    const { currentPage } = DiscordStore.getState();

    await discordSdk.commands.setActivity({
      activity: {
        type: 0, // Playing
        details: `Money: $${Math.trunc(money).toLocaleString()}`,
        state: `In ${toTitleCase(currentPage)}`,
        timestamps: {
          start: startTime,
        },
        assets: {
          large_image: "apple-touch-icon",
          large_text: "College Bank Clicker",
        },
      },
    });
  } catch (error) {
    console.error("Failed to update presence:", error);
  }
};

export const getDiscordUserAvatar = (user: DiscordUserType | null) => {
  if (!user) return "/assets/osaka.jpg";
  if (user.avatar) return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`;
  return `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
};

export const toTitleCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
