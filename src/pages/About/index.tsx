import { Box, Divider, Group, Image, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { memo } from "react";
import PageWrapper from "../../components/PageWrapper";
import { AboutAdditionalCredits } from "./AdditionalCredits";
import { AboutCredits } from "./Credits";

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
      <AboutCredits />
      <AboutAdditionalCredits />

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
