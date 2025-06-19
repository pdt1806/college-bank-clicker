import { Box, Container, Divider, Group, Image, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const sammie = {
  name: "Sammie Vizcarra",
  link: "",
};

const benny = {
  name: "Benny Nguyen",
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
    role: "Music & Sound Effects",
    author: [
      {
        name: "Usada Pekora BGM",
        link: "",
      },
    ],
  },
  {
    role: "Special Thanks To",
    author: [
      {
        name: "Melena Millhouse",
        link: "",
      },
      {
        name: "Polina Rotari",
        link: "",
      },
    ],
  },
];

const About = () => {
  const isMobile = useMediaQuery("(max-width: 75em)");

  return (
    <Box py="xs" c="white" h={isMobile ? "calc(100vh - 60px)" : "100vh"}>
      <ScrollArea.Autosize h="100%">
        <Container size="xl">
          <Image src="/assets/cbc-logo.svg" alt="Logo" w="100%" py="md" px="xs" maw={500} mx="auto" />
          <Box mb="xl" style={{ textAlign: "center" }}>
            <Text size="lg" mb="sm">
              A parody clicker game about the College Board AP exams, amusingly addictive for students and anyone
              needing a fun break.
            </Text>
            <Text size="lg" mb="xl">
              This game is not affiliated with the College Board or any of its products, and is purely a student-made
              project.
            </Text>
            <Text size="lg" mb="xl" style={{ textDecoration: "underline" }}>
              Disclaimer: This game is still in development, any bugs or issues encountered are expected.
            </Text>
            <Text size="lg" mb="sm">
              Version {__APP_VERSION__}
            </Text>
            <Group
              justify="center"
              gap="xs"
              component={Link}
              // @ts-expect-error: Link does have `to` prop
              to="https://github.com/pdt1806/college-bank-clicker"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit", width: "fit-content" }}
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
          <Stack gap="xl" align="center" justify="center" style={{ textAlign: "center" }} pb="xl" mb="xl">
            {credits.map((credit) => (
              <Box>
                <Title order={3} fw={500} mb="xs">
                  {credit.role}
                </Title>
                <Stack gap="xs">
                  {credit.author.map((author, index) => (
                    <Text key={index} size="lg">
                      {author.link ? (
                        <a
                          href={author.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {author.name}
                        </a>
                      ) : (
                        author.name
                      )}
                    </Text>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Container>
      </ScrollArea.Autosize>
    </Box>
  );
};

export default About;
