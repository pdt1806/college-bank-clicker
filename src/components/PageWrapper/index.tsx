import { Box, Container, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { UNIFORMED_HEIGHT } from "../../utils/const";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const isMobile = useMediaQuery("(max-width: 75em)");

  return (
    <Box c="white" h={isMobile ? UNIFORMED_HEIGHT : "100vh"}>
      <ScrollArea.Autosize scrollbarSize={8} h="100%">
        <Container size="xl" pt="xs" pb="xl">
          {children}
        </Container>
      </ScrollArea.Autosize>
    </Box>
  );
};

export default PageWrapper;
