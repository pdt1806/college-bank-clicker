import { Avatar, Box, Group, Stack, Text, Title } from "@mantine/core";
import { IconLink } from "@tabler/icons-react";

const sammie = {
  name: "Sammie Vizcarra",
  image: "/assets/sammie.png",
  link: "https://www.linkedin.com/in/sidesili/",
};

const benny = {
  name: "Benny Nguyen",
  image: "/assets/benny.png",
  link: "https://bennynguyen.dev",
};

const credits = [
  {
    role: "Clicker Game Idea",
    author: [sammie],
  },
  {
    role: "Game Design",
    author: [benny, sammie],
  },
  {
    role: "Code & Logic",
    author: [benny],
  },
  {
    role: "Art & Assets",
    author: [sammie],
  },
  {
    role: "Special Thanks To",
    author: [
      {
        name: "Melena Millhouse",
        image: "/assets/melena.png",
        link: "",
      },
      {
        name: "Polina Rotari",
        image: "/assets/polina.png",
        link: "",
      },
    ],
  },
];

export const AboutCredits = () => {
  return (
    <Stack gap="xl" align="center" justify="center" ta="center">
      {credits.map((credit) => (
        <Box key={credit.role}>
          <Title order={3} fw={500} mb="md">
            {credit.role}
          </Title>

          <Group gap="xl" justify="center" wrap="wrap" ta="center">
            {credit.author.map((author, index) => (
              <Box
                bg="cbc-bluegray.0"
                c="cbc-purple.9"
                py="md"
                px="xl"
                key={index}
                mt={60}
                component={author.link ? "a" : undefined}
                href={author.link || undefined}
                target={author.link ? "_blank" : undefined}
                rel={author.link ? "noopener noreferrer" : undefined}
                style={{
                  borderRadius: "var(--mantine-radius-xl)",
                  textDecoration: "none",
                }}
              >
                <Avatar
                  src={author.image}
                  alt={author.name}
                  size={125}
                  radius="50%"
                  style={{ marginBottom: "0.5rem", border: "5px solid var(--mantine-color-cbc-purple-9)" }}
                  mx="auto"
                  mt={-75}
                />
                <Group gap={5} justify="center" align="center">
                  <Text key={index} size="lg">
                    {author.name}
                  </Text>
                  {author.link && <IconLink size={18} style={{ color: "var(--mantine-color-cbc-purple-9)" }} />}
                </Group>
              </Box>
            ))}
          </Group>
        </Box>
      ))}
    </Stack>
  );
};
