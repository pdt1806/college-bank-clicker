import { Avatar, Box, Divider, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { memo } from "react";
import PageWrapper from "../../components/PageWrapper";

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

const About = () => {
  return (
    <PageWrapper>
      <Image src="/assets/cbc-logo.svg" alt="Logo" w="100%" py="md" px="xs" maw={500} mx="auto" />
      <Box mb="xl" style={{ textAlign: "center" }}>
        <Text size="lg" mb="sm">
          A parody clicker game about the College Board AP exams, amusingly addictive for students and anyone needing a
          fun break. Earn money, unlock upgrades, and discover satire through achievements and game items!
        </Text>
        <Text size="lg" mb="xl">
          This game is intended as a parody and satire of standardized testing culture, particularly the College Board’s
          AP program. It is not affiliated with or endorsed by the College Board. All jokes are made in good fun. This
          is purely a student-made project.
        </Text>
        <Text size="lg" mb="xl" fw={600}>
          Disclaimer: This game is still in development, any bugs or issues encountered are expected. Your game progress
          is not guaranteed to be compatible with future updates.
        </Text>
        <Text size="lg" mb="sm">
          Version {__APP_VERSION__}
        </Text>
        <Group
          justify="center"
          gap={5}
          component={Link}
          // @ts-expect-error: Link does have `to` prop
          to="https://github.com/pdt1806/college-bank-clicker"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            width: "fit-content",
            borderBottom: "1px solid white",
          }}
          mx="auto"
        >
          <IconBrandGithub size={24} />
          <Text size="lg">pdt1806/college-bank-clicker</Text>
        </Group>
      </Box>

      <Divider
        color="white"
        my="xl"
        label={
          <Text size="xl" fw={500} c="white">
            For Mobile Players
          </Text>
        }
        labelPosition="center"
      />
      <Text size="lg" mb="xl" style={{ textAlign: "center" }}>
        This game runs entirely in your browser and can be installed as a Progressive Web App (PWA) on mobile for
        offline play. Just tap "Add to Home Screen" on supported browsers to install.
      </Text>

      <Divider
        color="white"
        my="xl"
        label={
          <Text size="xl" fw={500} c="white">
            Credits
          </Text>
        }
        labelPosition="center"
      />
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
      <Stack mt="xl" align="center" justify="center" ta="center">
        <Title order={3} fw={500} mb="md">
          Additional Credits
        </Title>
        <Text size="lg">Sound effects were gathered from royalty-free YouTube videos labeled for reuse.</Text>
        <Text size="lg">
          Background music is the Loading Screen BGM of Hololive's VTuber{" "}
          <Text
            span
            c="cbc-teal"
            inherit
            component="a"
            href="https://www.youtube.com/@usadapekora"
            target="_blank"
            rel="noopener noreferrer"
          >
            Usada Pekora
          </Text>
          .
        </Text>
        <Text size="lg">
          Icons from{" "}
          <Text
            span
            c="cbc-teal"
            inherit
            component="a"
            href="https://tabler.io/icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tabler Icons
          </Text>
          .
        </Text>
        <Text size="lg">
          Money cursors from{" "}
          <Text
            span
            c="cbc-teal"
            inherit
            component="a"
            href="https://sweezy-cursors.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sweezy Cursors
          </Text>
          .
        </Text>
        <Text size="lg">
          CSS background patterns from{" "}
          <Text
            span
            c="cbc-teal"
            inherit
            component="a"
            href="https://www.magicpattern.design/tools/css-backgrounds"
            target="_blank"
            rel="noopener noreferrer"
          >
            MagicPattern
          </Text>
          .
        </Text>
        <Text size="lg">
          Dollar sign pattern background from{" "}
          <Text
            span
            c="cbc-teal"
            inherit
            component="a"
            href="https://www.freepik.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freepik
          </Text>
          .
        </Text>
        <Text size="lg">Kasane Pearto 🍐 🥀</Text>
      </Stack>

      <Divider
        color="white"
        my="xl"
        label={
          <Text size="xl" fw={500} c="white">
            Contact / Feedback
          </Text>
        }
        labelPosition="center"
      />
      <Text size="lg" mb="xl" style={{ textAlign: "center" }}>
        Have feedback, suggestions, or just want to say hi? Send an email to{" "}
        <Text span c="cbc-teal" inherit component="a" href="mailto:me@bennynguyen.dev">
          me@bennynguyen.dev
        </Text>
        , or open an issue on our{" "}
        <Text
          span
          c="cbc-teal"
          inherit
          component="a"
          href="https://github.com/pdt1806/college-bank-clicker/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </Text>
        .
      </Text>
    </PageWrapper>
  );
};

export default memo(About);
