import { Stack, Text, Title } from "@mantine/core";

export const AboutAdditionalCredits = () => {
  return (
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
        Money Bag image from{" "}
        <Text
          span
          c="cbc-teal"
          inherit
          component="a"
          href="https://www.svgrepo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SVG Repo
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
      <Text
        size="lg"
        c="cbc-teal"
        component="a"
        href="https://www.youtube.com/watch?v=yjBuru8lHLs"
        target="_blank"
        rel="noopener noreferrer"
      >
        Kasane Pearto 🍐 🥀
      </Text>
    </Stack>
  );
};
