import { Avatar, Box, Divider, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

const sammie = {
  name: "Sammie Vizcarra",
  image: "/assets/sammie.png",
  link: "",
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
  // {
  //   role: "Music & Sound Effects",
  //   author: [
  //     {
  //       name: "Usada Pekora BGM",
  //       image: "/assets/pekora.png",
  //       link: "",
  //     },
  //   ],
  // },
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
          fun break.
        </Text>
        <Text size="lg" mb="xl">
          This game is not affiliated with the College Board or any of its products, and is purely a student-made
          project.
        </Text>
        <Text size="lg" mb="xl" fw={600}>
          Disclaimer: This game is still in development, any bugs or issues encountered are expected.
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
            Credits
          </Text>
        }
        labelPosition="center"
      />
      <Stack gap="xl" align="center" justify="center" style={{ textAlign: "center" }}>
        {credits.map((credit) => (
          <Box key={credit.role}>
            <Title order={3} fw={500} mb="md">
              {credit.role}
            </Title>

            <Group gap="xl" justify="center" wrap="wrap" style={{ textAlign: "center" }}>
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
                    cursor: author.link ? "pointer" : "default",
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
    </PageWrapper>
  );
};

export default About;
